import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {

  constructor(private http: HttpClient) { }

  selectAll(obj: string){
    return this.http.get<Observable<any>>(`http://localhost:3000/${obj}`);
  }

  selectQuery(values: any){
    console.log(values);
    return this.http.post<Observable<any>>('http://localhost:3000/objects', values);
  }

  selectQueryCollection(values: any){
    console.log(values);
    return this.http.post<Observable<any>>('http://localhost:3000/collections', values);
  }

  selectQueryPurchase(values: any){
    console.log(values);
    return this.http.post<Observable<any>>('http://localhost:3000/purchases', values);
  }
}
