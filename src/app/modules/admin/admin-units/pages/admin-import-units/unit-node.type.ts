export class UnitNode {
  children?: UnitNode[];
  path: string = '';
  value: any;
  key!: string;
  type!: string;
  highlighted: boolean = false;
}
