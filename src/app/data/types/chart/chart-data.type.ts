import {ChartDataPoint} from "./chart-data-point.type";

export interface ChartData {
  values: ChartDataPoint[];
  measurementUnit: string;
  name: string;
}
