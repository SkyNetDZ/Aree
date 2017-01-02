import {Component, OnChanges, Input, style, state, trigger, ViewChild} from "@angular/core";
import {Filterchart} from "../filterChart/filterChart.component";
/**
 * Created by Inneasoft on 25/11/2016.
 */
@Component({
  selector: 'aree-fader',
  template: `
    <div [@visibilityChanged]="isVisible" >
       <aree-filter-chart></aree-filter-chart>
    </div>
  `,
  animations: [
    trigger('visibilityChanged', [
      state('true', style({opacity: 1})),
      state('false', style({opacity: 0}))
    ])]
})
export class Animate implements OnChanges {
  // visibility = 'shown';

  @Input() isVisible: boolean = true;
  @Input() attachedComp: any;
  private displayClass: string[];
  @ViewChild(Filterchart) filter: Filterchart;

  ngOnChanges() {
    //this.visibility = this.isVisible ? 'shown' : 'hidden';
    //this.attachedComp.style.width = this.isVisible ? '1130px' : '1650px';
    //this.filter.styleClass = this.isVisible ? ['col-xs-6','col-md-3'] : ['hide'];
  }
}
