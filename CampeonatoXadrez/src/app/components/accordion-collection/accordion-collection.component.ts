import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-accordion-collection',
  templateUrl: './accordion-collection.component.html',
  styleUrls: ['./accordion-collection.component.scss']
})
export class AccordionCollectionComponent implements OnInit {

  @ViewChild('button') button!:ElementRef;
  @ViewChild('content') content!:ElementRef;
  isExpanded = false;

  @Input() data!: any;

  constructor() { }

  ngOnInit(): void {
  }

  show_hide_content(){
    let ctn = this.content.nativeElement as HTMLElement;
    if(this.isExpanded){
      ctn.style.maxHeight = 0 + 'px';
    }
    else {
      ctn.style.maxHeight = ctn.scrollHeight + 'px';
    }
    this.isExpanded = !this.isExpanded;
  }
}
