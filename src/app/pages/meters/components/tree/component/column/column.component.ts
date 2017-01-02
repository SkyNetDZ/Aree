import {Component, Input} from "@angular/core";

@Component({
  moduleId: module.id,
  selector: 'aree-column',
  templateUrl: 'column.component.html',
  styleUrls: ['column.component.scss']
})
export class AreeColumnComponent {

  private model: any;
  private optionConfig: [any];
  @Input() name: string;

}
