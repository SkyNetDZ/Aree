import {Component} from "@angular/core";

@Component({
  moduleId: module.id,
  selector: 'aree-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class AreeHeaderComponent {

  columns: string[] = ['N°', 'Name', 'Unit', 'Consommation', 'ttt']

}
