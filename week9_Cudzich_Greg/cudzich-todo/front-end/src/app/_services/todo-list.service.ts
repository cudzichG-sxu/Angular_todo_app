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
}
