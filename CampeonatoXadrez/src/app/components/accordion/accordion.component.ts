import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {

  @ViewChild('button') button!:ElementRef;
  @ViewChild('content') content!:ElementRef;
  isExpanded = false;

  @Input() type!: string;
  @Input() data!: any;
  @Input() date = ''

  artType!: string;

  constructor() { }

  ngOnInit(): void {
    this.artType = this.data.TipoArte;
    if (this.date!==''){
      this.date = this.data.DataAquisicao.substring(0,10);
    }
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

  setClass(){
    return 'jogo'
  }

}
