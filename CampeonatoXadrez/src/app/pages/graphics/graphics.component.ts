import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
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
  resultQtdJogosMov: any;
  results2: any;
<<<<<<< HEAD
  colorScheme: Color =  {
    name: 'xadrez',
    domain: [
      '#FF8A80', 
      '#EA80FC',
      '#8C9EFF', 
      '#80D8FF', 
      '#A7FFEB', 
      '#CCFF90', 
      '#FFFF8D', 
      '#FF9E80'
    ],
    selectable: true,
    group: ScaleType.Ordinal
  };
=======
  colorScheme: Color = {
    name: 'custom',
    selectable: true,  
    group: ScaleType.Ordinal,
    domain: [
      'black', 
      '#d0d1d3',
    ]
  };
  

>>>>>>> 4c53af5513b1d28ffdca6ea26f2c7614ad6f5d37

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
<<<<<<< HEAD
    this.integration.selectAll('jogos_count_mov').subscribe({
      next: (data)=>{
        console.log(data);
        this.data2 = data;
        this.resultQtdJogosMov = this.getQtdJogosMov();       
      },
      error: (error)=>{console.log(error);
      }
    })
    // this.integration.selectAll('jogos_count_mov').subscribe({
    //   next: (data)=>{
    //     console.log(data);
    //     this.data2 = data;
    //     this.results2 = this.makeArray2();       
    //   },
    //   error: (error)=>{console.log(error);
    //   }
    // })
=======
>>>>>>> 4c53af5513b1d28ffdca6ea26f2c7614ad6f5d37
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
  getQtdJogosMov(){
    let seriesArr: any = []

    this.data2.forEach((element: any) => {
      let obj = {name: '', value: 0}
      obj.name = element.CountMov;
      obj.value = element.NumJogos;
      seriesArr.push(obj);
    });

    let result = [
      {
        name: 'Qtd. de Jogos',
        series: seriesArr
      }
    ]

    return seriesArr;
  }
}
