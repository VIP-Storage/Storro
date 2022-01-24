import {Component, Inject, Input} from '@angular/core';
import {DebugNode} from "./debug-node.type";
import {BehaviorSubject} from "rxjs";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {NestedTreeControl} from "@angular/cdk/tree";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-debug-dialog',
  templateUrl: './debug-dialog.component.html',
  styleUrls: ['./debug-dialog.component.scss']
})
export class DebugDialogComponent {

  @Input()
  title: string = '';

  @Input()
  set object(newValue: object) {
    const data = this.buildObjectTree(newValue);

    console.log(data);
    this.dataChange.next(data);
  }

  dataChange = new BehaviorSubject<DebugNode[]>([]);

  get data(): DebugNode[] { return this.dataChange.value; }

  nestedTreeControl: NestedTreeControl<DebugNode>;
  nestedDataSource: MatTreeNestedDataSource<DebugNode>;

  constructor(@Inject(MAT_DIALOG_DATA) public config: {title: string, object: object}|null) {

    if (config) {
      this.title = config.title;
      this.object = config.object;
    }

    this.nestedTreeControl = new NestedTreeControl<DebugNode>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
    this.dataChange.subscribe(data => this.nestedDataSource.data = data);
  }

  hasNestedChild = (_: number, nodeData: DebugNode) => !!nodeData.children;

  private _getChildren = (node: DebugNode) => node.children;


  buildObjectTree(obj: object, level: number = 0): DebugNode[] {
    return Object.keys(obj).reduce<DebugNode[]>((accumulator, key) => {
      // @ts-ignore
      const value: any = obj[key] as any;
      const node = new DebugNode();
      node.key = key;

      if (value != null) {
        console.log(key, value)
        if (typeof value === 'object') {
          node.children = this.buildObjectTree(value, level + 1);
        } else {
          node.value = value;
          node.type = (typeof value);
        }


        return accumulator.concat(node);
      }


      return accumulator;
    }, []);
  }
}
