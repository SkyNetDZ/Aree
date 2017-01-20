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
import { Directory } from '../model/Directory';
import { Meter } from '../model/Meter';
import { String } from 'shelljs';
import { TableCellComponent } from '../table-cell/table-cell.component';

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
    console.log(this.template);
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

  @Input() parent: number;

  @Input() children: Array<Meter>;

  @Input() padding: number;

  @Input() columns: Array<String>;

  @Input() mystyle: any;

  @Output() columnsLenght = new EventEmitter();

  @ViewChild(TableCellComponent, {read: ViewContainerRef}) cell;

  @ViewChildren(TableCellComponent, {read: ViewContainerRef}) cells: QueryList<any>;

  private static cells2: Array<any> = new Array();

  constructor(private resolver: ComponentFactoryResolver) {
  }


  ngAfterViewInit() {
    if (this.cells.length > 0) {
      this.cells.forEach(function (item) {
        TableRowComponent.cells2.push(item);
      })
    }
    console.log(TableRowComponent.cells2);
  }

  addCell() {
    const factory = this.resolver.resolveComponentFactory(TableCellComponent);
    // this.cell.createComponent(factory);
    TableRowComponent.cells2.forEach(function (r, i) {
      console.log(r);
      if (i % 3 == 2) {
        r.createComponent(factory).instance.content = "new cell" + i;
      }
    });
  }

  deleteCell(cell: TableCellComponent) { }

}
