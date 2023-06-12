import { Component, OnInit } from '@angular/core';
import { IntegrationService } from 'src/app/services/integration.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data!: any;

  constructor(private integration: IntegrationService){}

  ngOnInit(){
    this.integration.selectAll('objects').subscribe({
      next: (data)=>{
        console.log(data);
        this.data = data;
      },
      error: (error)=>{console.log(error);
      }
    })
  }

  filter(values: any){
    this.integration.selectQuery(values).subscribe({
      next: (data)=>{
        console.log(data);
        this.data = data;
      },
      error: (error) => {
        console.log(error);
        
      }
    }) 
  }

}
