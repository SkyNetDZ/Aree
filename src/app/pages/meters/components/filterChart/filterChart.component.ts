import {Component, ViewEncapsulation} from "@angular/core";
import {FormBuilder, Validators, FormGroup, AbstractControl} from "@angular/forms";
import {FilterChartService} from "./filterChart.service";
import {Router} from "@angular/router";


@Component({
  selector: 'aree-filter-chart',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./filterChart.scss')],
  template: require('./filterChart.html'),
})

export class Filterchart {

  public typeAnalyses: string[] = ["Consumption", "Energy"];
  public natures: string[] = ["Final Energy", "Primer Energy", "CO2", "Price"];
  public times: string[] = ["Year", "Month", "Week", "Day"];
  public rawData: boolean;
  public heatingTime: boolean;
  public temperature: boolean;
  public form: FormGroup;
  public router: Router;
  public filterService: FilterChartService;
  public type: AbstractControl;
  public nature: AbstractControl;
  public submitted: boolean = false;
  public styleClass: string[] = ['col-xs-6', 'col-md-4'];
  public checkboxModel = [{
    name: 'Temperature Externe',
    state: false,
    // class: 'has-success checkbox'
  }, {
    name: 'Degrée jours chaufage',
    state: false,
    // class: 'has-warning checkbox',
  }, {
    name: 'Degrée jours Climatisation',
    state: false,
    // class: 'has-error checkbox'
  }];

  public checkboxPropertiesMapping = {
    model: 'state',
    value: 'name',
    label: 'name',
    baCheckboxClass: 'class'
  };

  constructor(fb: FormBuilder, filterService: FilterChartService, router: Router) {
    this.router = router;
    this.filterService = filterService;
    this.form = fb.group({
      'type': ['', Validators.compose([Validators.required])],
      'nature': ['', Validators.compose([Validators.required])]
    });
    this.type = this.form.controls['type'];
    this.nature = this.form.controls['nature'];
  }

  public onSubmit(values: Object): void {
    this.submitted = true;
    if (this.form.valid) {

    }
  }
}
