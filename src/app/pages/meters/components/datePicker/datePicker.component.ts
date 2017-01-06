/**
 * Created by Inneasoft on 23/11/2016.
 */
import {Component, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'aree-date-picker',
  templateUrl: './datePicker.component.html'
})
export class DatePicker {
  @Output() date = new EventEmitter();
  @Input() label: string ;
  public model;

  constructor() {
  }

  ngOnInit(){
  }

  notifayChange(event){
    this.date.emit(this.model);
  }
}
