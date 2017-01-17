import { Component, ViewChild } from '@angular/core';
import { TreeComponent } from 'angular2-tree-component';

@Component({
  moduleId: module.id,
  selector: 'aree-tree',
  templateUrl: 'tree.component.html',
  styleUrls: ['tree.component.scss'],
})
export class AreeTreeComponent {

  checkbox: string = `<input type='checkbox'>`;
  @ViewChild('Tree') tree: TreeComponent;

  nodes = [{
    id: 1,
    name: 'Eclairage bureaux',
    Alarmids: null,
    CoefCommonUnit: 0,
    CoefDistribution: 100,
    CoefUnit: 1,
    DailyMax: 0,
    Description: null,
    Formula: null,
    IsDiff: false,
    IsDisabled: false,
    Locationid: 3,
    Parentid: null,
    RefFormula: null,
    RefSamplePeriod: 4,
    ReferenceYear: null,
    RolloverLimit: 0,
    Serviceid: 2,
    SourceMode: 0,
    Thresholdid: null,
    Trendid: 4,
    Trendids: null,
    Unitid: null,
    UseTheoreticalRef: null,
    Version: 0
  }, {
    id: 2,
    name: 'Eclairage RC',
    Alarmids: null,
    CoefCommonUnit: 0,
    CoefDistribution: 100,
    CoefUnit: 0.5,
    DailyMax: 0,
    Description: null,
    Formula: null,
    IsDiff: false,
    IsDisabled: false,
    Locationid: 2,
    Parentid: 3,
    RefFormula: null,
    RefSamplePeriod: 4,
    ReferenceYear: null,
    RolloverLimit: 0,
    Serviceid: 2,
    SourceMode: 0,
    Thresholdid: null,
    Trendid: 5,
    Trendids: null,
    Unitid: null,
    UseTheoreticalRef: null,
    Version: 0
  }, {
    id: 3,
    name: 'Eau',
    Alarmids: [1],
    CoefCommonUnit: 0,
    CoefDistribution: 100,
    CoefUnit: 0.01,
    DailyMax: 0,
    Description: null,
    Formula: null,
    IsDiff: false,
    IsDisabled: false,
    Locationid: 1,
    Parentid: 1,
    RefFormula: '',
    RefSamplePeriod: 4,
    ReferenceYear: null,
    RolloverLimit: 0,
    Serviceid: 4,
    SourceMode: 0,
    Thresholdid: null,
    Trendid: 6,
    Trendids: null,
    Unitid: null,
    UseTheoreticalRef: null,
    Version: 0
  }, {
    id: 4,
    name: 'Chauffage',
    Alarmids: null,
    CoefCommonUnit: 0,
    CoefDistribution: 100,
    CoefUnit: 1,
    DailyMax: 0,
    Description: null,
    Formula: null,
    IsDiff: false,
    IsDisabled: false,
    Locationid: 1,
    Parentid: 1,
    RefFormula: null,
    RefSamplePeriod: 4,
    ReferenceYear: null,
    RolloverLimit: 0,
    Serviceid: 1,
    SourceMode: 0,
    Thresholdid: null,
    Trendid: 7,
    Trendids: null,
    Unitid: null,
    UseTheoreticalRef: null,
    Version: 0
  }, {
    id: 5,
    name: 'Climatisation',
    Alarmids: null,
    CoefCommonUnit: 0,
    CoefDistribution: 100,
    CoefUnit: 1,
    DailyMax: 0,
    Description: null,
    Formula: null,
    IsDiff: false,
    IsDisabled: false,
    Locationid: 1,
    Parentid: null,
    RefFormula: null,
    RefSamplePeriod: 4,
    ReferenceYear: null,
    RolloverLimit: 0,
    Serviceid: 5,
    SourceMode: 0,
    Thresholdid: null,
    Trendid: 8,
    Trendids: null,
    Unitid: null,
    UseTheoreticalRef: null,
    Version: 0
  }];


  //
  // nodes = [
  //   {
  //     id: 1,
  //     name: 'root1',
  //     children: [
  //       {id: 2, name: 'child1'},
  //       {id: 3, name: 'child2'}
  //     ]
  //   },
  //   {
  //     id: 4,
  //     name: 'root2',
  //     children: [
  //       {id: 5, name: 'child2.1'},
  //       {
  //         id: 6,
  //         name: 'child2.2',
  //         children: [
  //           {id: 7, name: 'subsub'}
  //         ]
  //       }
  //     ]
  //   }
  // ];

  constructor() {

  }

  ngOnInit() {
    let models = this.nodes;
    let children = [];
    for (let model of models) {
      if (model['Parentid'] != null) {
        let parent = models.filter(function (i, n) {
          return i.id === model['Parentid'];
        })[0];
        parent['children'] = [];
        parent['children'].push(model);
        models.splice(models.indexOf(model), 1);
      }
    }
    this.nodes = models;
  }

  ngAfterViewInit() {

  }
}
