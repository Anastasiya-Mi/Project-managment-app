import { Injectable } from "@angular/core";
// import { Headers, Response } from "@angular/http";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { AuthService } from '../../services/auth.service';

import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest
} from "@angular/common/http";

export interface genericServer {
  capacity: number;
  id: number;
  name: string;
}

@Injectable() //we will do inject service given by angular http
export class ServerService {
  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  //add a method
  // storeServers(servers: genericServer[]) {
  //   return this.httpClient.put(
  //     "https://ng-http-b3515.firebaseio.com/data.json",
  //     servers
  //   );
  // }
  /*
  storeServers(servers: genericServer[]): Observable<genericServer> {

    // return this.httpClient.put(
    //   "https://ng-http-b3515.firebaseio.com/data.json",
    //   servers, {
    //     observe: 'events' to listen HttpEvents on subscriber response side
    //   }
    // );

    const headers = new HttpHeaders().set('Authorization', 'xyz').append('Content-Type', 'application/json');
    return this.httpClient.put<genericServer>(
      "https://ng-http-b3515.firebaseio.com/data.json",
      servers, {
        observe: 'body',
        //params: new HttpParams().set('auth', 'token'), //?auth=token
        //:headers //gives http header object which is js object
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }
    );

  }
  */
// token!:any;
  storeServers(servers: genericServer[]) {

    const token =  this.authService.getToken();

    //(Advanced way, specially for uploading file or downlaoding)
    //using Progress (we discussed listenting event HttpEvents example)
    const req = new HttpRequest(
      "PUT",
      "https://ng-http-b3515.firebaseio.com/data.json",
      servers,
      { reportProgress: true, params: new HttpParams().set('auth', token) }
    );
    // .get("https://ng-http-b3515.firebaseio.com/data.json' ) //(type of request, url, data need to send)
    return this.httpClient.request(req); //returning observable

    //check output in Progress.PNG(attached)

  }

  getServers() {
       //getting auth token from firebase to pass authentication
    
   const token =  this.authService.getToken();

    return (
    
      this.httpClient
        // .get<genericServer[]>("https://ng-http-b3515.firebaseio.com/data.json")
        // .get("https://ng-http-b3515.firebaseio.com/data.json", {
        // observe: 'response',
        // responseType: 'text'
        // observe: 'body',
        // responseType: 'text'
        //default is
        .get<genericServer[]>(
          "https://ng-http-b3515.firebaseio.com/data.json",
          {
            observe: "body",
            responseType: "json",
            params: new HttpParams().set('auth', token)
          }
        )
        .pipe(
          map(
            //map operator will take returned data and wrap into observable
            response => {
              //no need to define response type as we did with get<>
              for (const server of response) {
                server.name = "FETCHED_" + server.name;
              }

              return response;
              // console.log(response);
              // return [];
            }
          )
        )
        .pipe(
          catchError((error: Response) => {
            console.log(error);
            return throwError("Something went wrong..");
          })
        )
    );
  }

  getAppName() {
      const token =  this.authService.getToken();
    return this.httpClient
      .get<Promise<any>>("https://ng-http-b3515.firebaseio.com/appName.json", {
       params: new HttpParams().set('auth', token) 
      })
      .pipe(
        map(response => {
          return response;
        })
      );
  }
}
