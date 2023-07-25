import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from '../../User';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  
  constructor(private http: HttpClient) { }
// запрашиваем массив коллекций/элементов
  getPersonalList(){
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users?_start=0&_limit=5');
  }
// возвращаем 1 элемент
  getPerson(id: string) {
    return this.http.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`);
  }

  setData(data:any){
    const value = JSON.stringify(data)
    localStorage.setItem('data',value)
  }

  getData(){
    return JSON.parse(localStorage.getItem('data') || '{}');
  }
}
