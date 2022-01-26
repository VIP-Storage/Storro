import {Component} from '@angular/core';
import {storroAnimations} from "../../../shared/animations";
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {BehaviorSubject, Observable} from "rxjs";
import {UnitNode} from "./unit-node.type";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UnitType} from "../../../../data/types";
import {map} from "rxjs/operators";
import {UnitTypesService} from "../../../../api/backend/services/unit-types.service";
import {CurrencyPipe} from "@angular/common";
import {UnitsService} from "../../../../api/backend/services/units.service";
import {PageTitleService} from "../../../../services/page-title.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-import-units',
  templateUrl: './admin-import-units.component.html',
  styleUrls: ['./admin-import-units.component.scss'],
  animations: storroAnimations
})
export class AdminImportUnitsComponent {

  submitted: boolean = false;
  currentFile?: File | null;
  idFieldKey: string | null = null;
  arrayRootFieldKey: string | null = null;
  error: string | null = null;
  fileContent: object | null = null;
  dataChange = new BehaviorSubject<UnitNode[]>([]);

  nestedTreeControl: NestedTreeControl<UnitNode>;
  nestedDataSource: MatTreeNestedDataSource<UnitNode>;

  location = new FormControl('Cordova', [Validators.required]);
  unitType = new FormControl('', [Validators.required]);

  uploadForm: FormGroup = new FormGroup({
    location: this.location,
    unitType: this.unitType
  });

  unitTypes: Observable<UnitType[]>;

  hasNestedChild = (_: number, nodeData: UnitNode) => !!nodeData.children;

  private currencyPipe: CurrencyPipe = new CurrencyPipe('en');
  private _getChildren = (node: UnitNode) => node.children;

  constructor(private unitTypesService: UnitTypesService,
              private unitsService: UnitsService,
              private router: Router,
              private pageTitleService: PageTitleService) {
    this.pageTitleService.title = 'Import Units';
    this.nestedTreeControl = new NestedTreeControl<UnitNode>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
    this.dataChange.subscribe(data => this.nestedDataSource.data = data);
    this.location.disable();

    this.unitTypes = this.unitTypesService.getUnitTypes().pipe(
      map(res => res.items)
    );
  }

  get data(): UnitNode[] {
    return this.dataChange.value;
  }

  get uploadDisabled() {
    return this.location.invalid || this.idFieldKey === null || this.fileContent === null || this.arrayRootFieldKey === null || this.unitType.invalid || this.submitted;
  }

  onSelect(event: any) {
    this.currentFile = event.addedFiles[0];
    this.loadFile();
  }

  removeFile() {
    this.currentFile = null;
    this.fileContent = null;
    this.idFieldKey = null;
    this.arrayRootFieldKey = null;
  }

  loadFile() {
    if (this.currentFile) {
      let fileReader = new FileReader();
      fileReader.onload = () => {
        try {
          this.fileContent = JSON.parse(fileReader.result as string);

          const data = this.buildObjectTree(this.fileContent as any);
          this.dataChange.next(data);
        } catch (e) {
          this.error = `${e}`;
        }
      }
      fileReader.readAsText(this.currentFile);
    }
  }

  buildObjectTree(obj: object, level: number = 0, parent?: string): UnitNode[] {
    if (level >= 4) {
      return [];
    }

    return Object.keys(obj).reduce<UnitNode[]>((accumulator, key) => {
      // @ts-ignore
      const value: any = obj[key] as any;
      const node = new UnitNode();
      node.key = key;

      if (value != null && key !== 'geometry') {
        if (!!parent && Number.isNaN(Number(key))) {
          node.path = `${parent}.${key}`
        } else if (!!parent) {
          node.path = parent;
        } else if (Number.isNaN(Number(key))) {
          node.path = key;
        }

        if (typeof value === 'object') {
          node.children = this.buildObjectTree(value, level + 1, node.path).slice(0, 150);
        } else {
          node.value = value;
          node.type = (typeof value);
        }

        return accumulator.concat(node);
      }


      return accumulator;
    }, []);
  }

  isHighlighted(node: UnitNode) {
    if (!node.children) {
      return (this.idFieldKey ? this.idFieldKey.split('.').pop() === node.key : false)
    }

    return (this.arrayRootFieldKey ? this.arrayRootFieldKey.split('.').pop() === node.key : false)
  }

  selectIDField(node: UnitNode) {
    this.idFieldKey = node.path;
  }

  selectArrayKey(node: UnitNode) {
    this.arrayRootFieldKey = node.path;
  }

  get hasData() {
    return !!this.fileContent;
  }

  upload() {
    this.submitted = true;
    this.error = null;

    if (!!this.idFieldKey && this.arrayRootFieldKey) {
      this.unitsService.importUnitsJSON(
        this.location.value,
        this.unitType.value,
        this.idFieldKey,
        this.arrayRootFieldKey,
        this.fileContent
      ).subscribe(res => {
        if (!res.success) {
          this.error = res.message;
        } else {
          this.router.navigate(['/admin/units']).then();
        }
      });
    }
  }

  getUnitTypeDisplayName(unitType: UnitType) {
    let billingInterval = 'month';

    if (unitType.billingInterval.includes('week')) {
      billingInterval = 'week'
    } else if (unitType.billingInterval.includes('year')) {
      billingInterval = 'year';
    }

    return `${unitType.name} - ${this.currencyPipe.transform(unitType.price)}/${billingInterval}`;
  }
}
