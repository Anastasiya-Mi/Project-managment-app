// import { ResolveFn } from '@angular/router';

// export const userResolver: ResolveFn<boolean> = (route, state) => {
  
//   return true;
// };
import { Injectable } from '@angular/core';
import {
  Router, 
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {catchError, delay, EMPTY, Observable, of} from 'rxjs';
import {ProjectService} from '../projects-components/services/services.service';
import {User} from '../User';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User> {
  constructor(private projectService: ProjectService, private router: Router ) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this.projectService.getPerson(route.params?.['title']).pipe(
      // delay(),
      catchError( () => {
        this.router.navigate(['projects'])
        return EMPTY
      })
    )
  }
}