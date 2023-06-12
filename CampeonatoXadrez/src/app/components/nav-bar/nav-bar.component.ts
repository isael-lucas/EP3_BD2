import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  months: number[] = Array.from(Array(12).keys()); 
  years: number[] = Array.from(Array(30).keys());
  forms!: FormGroup;

  @Output() formValues = new EventEmitter<any>();
  @Input() type:string = 'objeto';

  constructor(private fb: FormBuilder) {
    
  }

  ngOnInit(): void {
    if (this.type === 'objeto') {
      this.forms = this.fb.group({
        TipoArte: ['Todos'],
        TipoPermanencia: ['Todos'],
        AnoCriacao: [null]
      })
    }
    else if (this.type === 'colecao'){
      
      this.forms = this.fb.group({
        Ordem: ['desc'],
        Mes: ['Todos'],
        AnoCriacao: [null]
      })
    }
    else{
      this.forms = this.fb.group({
        Mes: ['Todos'],
        AnoCriacao: [null]
      })
    }
  }

  filter(values: any){
    this.formValues.emit(values);
  }

}
