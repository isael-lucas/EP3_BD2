import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { IntegrationService } from 'src/app/services/integration.service';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss']
})
export class GraphicsComponent implements OnInit{

  data!: any;
  data2!: any;
  data3!: any;
  resultJogosMov: any;
  resultQtdJogosMov: any;
  resultJogadoresPais: any;
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
    this.integration.selectAll('jogos_count_mov').subscribe({
      next: (data)=>{
        console.log(data);
        this.data2 = data;
        this.resultQtdJogosMov = this.getQtdJogosMov();       
      },
      error: (error)=>{console.log(error);
      }
    })
    this.integration.selectAll('jogadores_by_pais').subscribe({
      next: (data)=>{
        console.log(data);
        this.data3 = data;
        console.log(this.data3);
        this.resultJogadoresPais = this.getJogadoresByPais();       
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
  getJogadoresByPais(){
    let seriesArr: any = []

    this.data3.forEach((element: any) => {
      let obj = {name: '', value: 0}
      obj.name = element.NomePais;
      obj.value = element.NumJogadores;
      seriesArr.push(obj);
    });

    let result = [
      {
        name: 'Qtd. de Jogadores',
        series: seriesArr
      }
    ]

    return seriesArr;
  }
}
