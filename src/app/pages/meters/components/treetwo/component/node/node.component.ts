import {Component, Input, OnInit} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'node',
  templateUrl: '/node.component.html',
  styleUrls: ['/node.component.scss']
})
export class NodeComponent implements OnInit {

  @Input() item: any;
  IsExpanded: boolean = false;

  ngOnInit() {
    console.log(this.item);
  }

  toggle() {
    this.IsExpanded = !this.IsExpanded;
    console.log(this.IsExpanded + " " + this.item.label);

  }

}


