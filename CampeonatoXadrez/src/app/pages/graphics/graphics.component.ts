import { Component, OnInit } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { IntegrationService } from 'src/app/services/integration.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss']
})
export class GraphicsComponent implements OnInit{

  data!: any;
  data2!: any;
  resultJogosMov: any;
  resultsDate: any;
  results2: any;
  colorScheme: Color = {
    name: 'custom',
    selectable: true,  
    group: ScaleType.Ordinal,
    domain: [
      'black', 
      '#d0d1d3',
    ]
  };
  


  // options


  ngOnInit(){
    this.integration.selectAll('jogos_mov').subscribe({
      next: (data)=>{
        console.log(data);
        this.data = data;
        this.resultJogosMov = this.getJogosMov();
        console.log(this.resultJogosMov);
        
      },
      error: (error)=>{console.log(error);
      }
    })
  }

  constructor(private integration: IntegrationService) {
  }

  getJogosMov(){
    let seriesArr: any = []

    this.data.forEach((element: any) => {
      let obj = {name: '', value: 0}
      obj.name = `Jogo ${element.CodJogo}`;
      obj.value = element.QtdMovimento;
      seriesArr.push(obj);
    });

    let result = [
      {
        name: 'N. de Movimentos',
        series: seriesArr
      }
    ]

    return seriesArr;
  }
}
