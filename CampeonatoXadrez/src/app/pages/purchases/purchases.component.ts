import { Component, OnInit } from '@angular/core';
import { IntegrationService } from 'src/app/services/integration.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit {

  data!: any;

  constructor(private integration: IntegrationService){}

  ngOnInit(){
    this.integration.selectAll('purchases').subscribe({
      next: (data)=>{
        console.log(data);
        this.data = data;        
      },
      error: (error)=>{console.log(error);
      }
    })
  }

  filter(values: any){
    this.integration.selectQueryPurchase(values).subscribe({
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
