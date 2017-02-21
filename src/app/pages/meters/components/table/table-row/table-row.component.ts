import {
  Directive,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  HostListener,
  TemplateRef,
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ViewChildren,
  AfterViewInit,
  ViewContainerRef,
  QueryList,
  ContentChildren,
  ComponentFactoryResolver
}
  from '@angular/core';
import {Directory} from '../model/Directory';
import {Meter} from '../model/Meter';
import {String} from 'shelljs';
import {TableCellComponent} from '../table-cell/table-cell.component';
import {TableService} from "../service/table.service";

@Directive({
  selector: '[first]'
})
export class FirstDirective {
  //@HostBinding() innerText = `I'm a directive!`;
  // @HostBinding() get innerText(){
  //     return this.first;
  // }
  @HostListener('click', ['$event']) onClick($event) {
    this.first = 'clicked';
  }

  @Input() set first(value) {
    //console.log(this.template);
    this.view.createEmbeddedView(this.template, {
      $implicit: 'Angular'
    });
  }

  constructor(el: ElementRef,
              private view: ViewContainerRef,
              private template: TemplateRef<any>) {
    console.log(el.nativeElement);
  }

  ngAfterViewInit() {
  }
}

@Component({
  selector: 'app-table-row',
  templateUrl: 'table-row.component.html',
  styleUrls: ['table-row.component.css'],
  // host: {
  //   '[style.backgroundColor]': 'mystyle.backgroundColor'
  // }
})
export class TableRowComponent {

  @Input() level: number;

  static levelCol: Array<number> = [];

  @Input() initLength: number;

  @Output() dataChart = new EventEmitter();

  @Input() cellWidth: number;

  @Input() parent: number;

  @Input() children: Array<Meter>;

  @Input() padding: number;

  @Input() columns: Array<String>;

  @Input() mystyle: any;

  @Output() columnsLenght = new EventEmitter();

  @ViewChild(TableCellComponent, {read: ViewContainerRef}) cell;

  @ViewChildren(TableCellComponent, {read: ViewContainerRef}) cells: QueryList<any>;

  // @Output() selected = new EventEmitter();

  @Input() freezedColumns: Array<any>;

  private selectedRow: boolean = false;

  private static cells2: Array<any> = [];

  dataTemp: [any];

  // @HostListener('mouseover', ['$event'])
  // mouseover(event) {
  //      this.selected.emit(event);
  // }


  // @HostListener('select', ['$event'])
  // onSelect(event) {
  //   console.log(event.target);
  // }


  //@ViewChild('foo') template;
  constructor(private view: ViewContainerRef, private resolver: ComponentFactoryResolver, private el: ElementRef, private _metersService: TableService) {
  }


  // ngAfterContentInit(){
  //   this.view.createEmbeddedView(this.template);
  //
  // }
  ngAfterViewInit() {
    if (this.cells.length > 0) {
      this.cells.forEach(function (item) {
        TableRowComponent.cells2.push(item);
      })
    }
  }

  // addCell() {
  //   const factory = this.resolver.resolveComponentFactory(TableCellComponent);
  //   // this.cell.createComponent(factory);
  //   TableRowComponent.cells2.forEach(function (r, i) {
  //     console.log(r);
  //     if (i % 3 == 2) {
  //       r.createComponent(factory).instance.content = "new cell" + i;
  //     }
  //   });
  // }
  //
  // deleteCell(cell: TableCellComponent) {
  // }


  selectRowTable(event) {
    //this.selectedRow = event;
  }

  checkRow(event, model) {
    console.log(event);
    console.log(model);

    this._metersService.getConsumptionPerPeriod(model.Id)
      .subscribe(
        d => this.dataChart.emit(JSON.parse(JSON.stringify(d))['Data'][0]['Data']),
        error => console.log(error),
        () => console.log('finish load data')
      );

  }

  setParentDataChart(event) {
    console.log('hild send data to paent node ');
    this.dataChart.emit(event);
  }

  freezedColumn(index: number, cell: any) {
    if (cell != null && cell.configCol != null) {
      return cell.configCol.freez;
    }
    return index == 0;
  }

  adaptOffset(index: number, cell: any) {
    let offset: number;
    let indexFreezed = this.freezedColumns.findIndex(o => Object.is(o, cell));
    if (indexFreezed > -1) {
      offset = (indexFreezed + 1 ) * 100 + 10;
    } else {
      offset = index * 100 + 10;
    }
    return offset;
  }

  ngOnChanges(changes: any) {
    console.log(changes);
    if (changes.level != null) {
      TableRowComponent.levelCol.push(changes.level.currentValue);
    }
    console.log(TableRowComponent.levelCol.toString());
  }
}
