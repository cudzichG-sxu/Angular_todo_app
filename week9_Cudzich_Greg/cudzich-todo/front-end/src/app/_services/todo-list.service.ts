import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor(private httpClient: HttpClient) { }

  getAllListItems(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/list`)

  }

  create( newListItems ): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/listItemActual`, {listItem: newListItems})
  }

  delete( itemToBeDeleted ): Observable<any> {
    //not sure if anything needs to go into options so I left it blank
    //if there's suppose to be something in options I'd like to know
    return this.httpClient.delete<any>(`${environment.apiUrl}/deleteItem/?id=${itemToBeDeleted}`, {})
  }
}
