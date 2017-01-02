import {Component, Input} from "@angular/core";

@Component({
  moduleId: module.id,
  selector: 'aree-cell',
  templateUrl: 'cell.component.html',
  styleUrls: ['cell.component.scss']
})
export class AreeCellComponent {

  @Input() cellConfig: [any];
  @Input() value: [any];

  constructor() {

  }

  ngOnInit() {

  }

}
