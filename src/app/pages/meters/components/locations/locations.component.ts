import {Component, ViewEncapsulation} from '@angular/core';

import {LocationsService} from './locations.service';

@Component({
  selector: 'aree-location',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./locations.scss')],
  template: require('./locations.html'),
})

export class Locations {

  data: any;

  constructor(private _locationsService: LocationsService) {
  }

  ngOnInit() {
    this.data = this._locationsService.getAll();
  }

  getResponsive(padding, offset) {
    return this._locationsService.getResponsive(padding, offset);
  }
}
