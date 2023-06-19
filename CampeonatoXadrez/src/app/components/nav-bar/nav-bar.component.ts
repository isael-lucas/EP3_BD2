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
      this.forms = this.fb.group({
        Arbitro: [null],
        Jogadores: [null],
        Hotel: [null]
      })
  }

  filter(values: any){
    this.formValues.emit(values);
  }

}
