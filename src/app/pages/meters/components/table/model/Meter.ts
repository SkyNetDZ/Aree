/**
 * Created by Inneasoft on 13/12/2016.
 */
export class Meter {
  Id: number = null;
  Name: string = "";
  AlarmIds: [any];
  CoefCommonUnit: number = 0;
  CoefDistribution: number = 0;
  CoefUnit: number = 0;
  DailyMax: number = 0;
  Description: null;
  Formula: null;
  IsDiff: false;
  IsDisabled: false;
  LocationId: number = 0;
  ParentId: number = null;
  RefFormula: null;
  RefSamplePeriod: number = null;
  ReferenceYear: null;
  RolloverLimit: number = 0;
  ServiceId: number = 0;
  SourceMode: 0;
  ThresholdId: number = null;
  TrendId: number = null;
  TrendIds: null;
  UnitId: null;
  UseTheoreticalRef: null;
  Version: 0;
  children: Meter[];
  expanded: boolean;
  checked: boolean;

  constructor(name, children) {
    this.Name = name;
    this.children = children;
    this.expanded = false;
    this.checked = false;
  }

  toggle() {
    this.expanded = !this.expanded;
  }

  check() {
    let newState = !this.checked;
    this.checked = newState;
    this.checkRecursive(newState);
  }

  checkRecursive(state) {
    this.children.forEach(d => {
      d.checked = state;
      d.checkRecursive(state);
    })
  }
}
