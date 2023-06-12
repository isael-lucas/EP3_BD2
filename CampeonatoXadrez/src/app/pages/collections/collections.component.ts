import { Component, OnInit } from '@angular/core';
import { IntegrationService } from 'src/app/services/integration.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {

  data!: any;

  constructor(private integration: IntegrationService){}

  ngOnInit(){
    this.integration.selectAll('collections').subscribe({
      next: (data)=>{
        console.log(data);
        this.data = data;
      },
      error: (error)=>{console.log(error);
      }
    })
  }

  filter(values: any){
    console.log(values);
    
    this.integration.selectQueryCollection(values).subscribe({
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
