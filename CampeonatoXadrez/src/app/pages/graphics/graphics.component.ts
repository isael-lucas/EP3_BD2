import { Component, OnInit } from '@angular/core';
import { IntegrationService } from 'src/app/services/integration.service';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss']
})
export class GraphicsComponent implements OnInit{

  data!: any;
  data2!: any;
  results: any;
  resultsDate: any;
  results2: any;

  // options


  ngOnInit(){
    this.integration.selectAll('purchases').subscribe({
      next: (data)=>{
        console.log(data);
        this.data = data;
        this.results = this.makeArray();
        this.resultsDate = this.makeArrayDate();
        console.log(this.results);
        
      },
      error: (error)=>{console.log(error);
      }
    })
    this.integration.selectAll('collections').subscribe({
      next: (data)=>{
        console.log(data);
        this.data2 = data;
        this.results2 = this.makeArray2();       
      },
      error: (error)=>{console.log(error);
      }
    })
  }

  constructor(private integration: IntegrationService) {
  }

  makeArray(){
    let seriesArr: any = []

    this.data.forEach((element: any) => {
      let obj = {name: '', value: 0}
      obj.name = element.Titulo;
      obj.value = parseFloat(element.Custo);
      seriesArr.push(obj);
    });

    let result = [
      {
        name: 'Curva de Gastos',
        series: seriesArr
      }
    ]

    return result;
  }
  makeArrayDate(){
    let seriesArr: any = []
    let aux = []
    let result: any = []
    this.data.forEach((element: any) => {
      let obj = {name: '', value: 0}
      let obj2 = {name:element.Titulo, series:[obj]}
      obj.name = element.DataAquisicao.substring(0,7);
      obj.value = parseFloat(element.Custo);
      obj2.series[0] =obj;
      result.push(obj2)
    });
    console.log(result);
    
    return result;
  }
  makeArray2(){
    let seriesArr: any = []

    this.data2.forEach((element: any) => {
      let obj = {name: '', value: 0}
      obj.name = element.Nome;
      obj.value = element.QTD;
      seriesArr.push(obj);
    });

    let result = [
      {
        name: 'Objetos Arte por coleção',
        series: seriesArr
      }
    ]

    return result;
  }
}
