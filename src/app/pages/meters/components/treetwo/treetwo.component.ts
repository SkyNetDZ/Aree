import {Component, Input} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'treetwo',
  templateUrl: '/treetwo.component.html',
  styleUrls: ['/treetwo.component.scss']
})
export class TreetwoComponent {

  @Input() data: any[];

}
