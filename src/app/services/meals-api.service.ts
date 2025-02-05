import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const baseURL: string = "https://www.themealdb.com/api/json/v1/1";

@Injectable({
  providedIn: 'root'
})

export class MealsAPIService {
  constructor(private http: HttpClient) { }

  getAllMeals(): Observable<any> {
    return this.http.get(`${baseURL}/search.php?s=`);
  }
  getCategories(): Observable<any> {
    return this.http.get(`${baseURL}/list.php?c=list`);
  }
  getCatMeals(query: string): Observable<any> {
    return this.http.get(`${baseURL}/filter.php?c=${query}`);
  }
}
