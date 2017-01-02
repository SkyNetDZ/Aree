/**
 * Created by Inneasoft on 24/11/2016.
 */
import {Component, ElementRef} from "@angular/core";
import {BrowserDomAdapter} from "@angular/platform-browser/src/browser/browser_adapter";

@Component({
  selector: 'aree-splitter',
  template: '<div></div>',
  styles: [require('./splitter.scss')],
})
export class Splitter {


  private partOne: any;
  private partTwo: any;
  private splitter: ElementRef;
  private last_x: number;
  private window_width: number;
  private dom: BrowserDomAdapter;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

  // @HostListener('mousedown', ['$event'])
  // onMousedown(ev) {
  //   this.spMouseDown(ev);
  // }
  //
  // @HostListener('mousemove', ['$event'])
  // onMousemove(ev) {
  //   this.spMouseMove(ev)
  // }
  //
  // @HostListener('mouseup', ['$event'])
  // onMouseup(ev) {
  //   this.spMouseUp(ev);
  // }


  constructor(el: ElementRef) {
    this.splitter = el;
  }

//   ngAfterViewInit(){
//
//   }
//
//   ngOnInit()
// {
//   this.dom = new BrowserDomAdapter();
//   this.partOne = this.dom.parentElement(this.splitter.nativeElement).children[0];
//   this.partTwo = this.dom.parentElement(this.splitter.nativeElement).children[2];
//   var window_width = this.partOne.offsetWidth + this.partTwo.offsetWidth;
//   // var dx= this.partOne.offsetWidth;
//   // // this.partOne.nativeElement.style.position = 'absolute';
//   // // this.partOne.nativeElement.style.float = 'left';
//   // // this.partTwo.nativeElement.style.position = 'absolute';
//   // // this.partTwo.nativeElement.style.float = 'left';
//   // this.splitter.nativeElement.style.marginLeft=dx+"px";
//   // dx+=this.splitter.nativeElement.clientWidth;
//   // this.partTwo.style.marginLeft=dx+"px";
//   // dx= window_width-dx;
//   // this.partTwo.style.width=dx+"px";
// }
//   spMouseDown(ev)
// {
//   document.removeEventListener("mousedown",this.spMouseDown , false );
//   window.addEventListener("mousemove",this.spMouseMove);
//   window.addEventListener("mouseup",this.spMouseUp);
//   this.last_x = ev.clientX;
// }
//
//    spMouseUp(ev)
// {
//   window.removeEventListener("mousemove",this.spMouseMove);
//   window.removeEventListener("mouseup",this.spMouseUp);
//   document.addEventListener("mousedown",this.spMouseDown);
//   this.resetPosition(this.last_x);
// }
//
//    spMouseMove(ev)
// {
//   this.resetPosition(ev.clientX);
// }
//
//    resetPosition(nowX)
// {
//   var dx=nowX-this.last_x;
//   dx+=this.partOne.offsetWidth;
//   this.partOne.style.width=dx+"px";
//   this.splitter.nativeElement.style.marginLeft=dx+"px";
//   dx+=this.splitter.nativeElement.offsetWidth;
//   this.partTwo.style.marginLeft=dx+"px";
//   dx= this.window_width-dx;
//   this.partTwo.style.width=dx+"px";
//   this.last_x=nowX;
// }

}
