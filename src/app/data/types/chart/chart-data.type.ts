import {ChartDataPoint} from "./chart-data-point.type";

export interface ChartData {
  values: ChartDataPoint[];
  unit: string;
  name: string;
}
