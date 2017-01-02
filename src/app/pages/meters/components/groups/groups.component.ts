import {Component, ViewEncapsulation} from "@angular/core";
import {GroupsService} from "./groups.service";

@Component({
  selector: 'aree-group',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./groups.scss')],
  template: require('./groups.html'),
})

export class Groups {

  data: any;

  constructor(private _groupsService: GroupsService) {
  }

  ngOnInit() {
    this.data = this._groupsService.getAll();
  }

  getResponsive(padding, offset) {
    return this._groupsService.getResponsive(padding, offset);
  }
}
