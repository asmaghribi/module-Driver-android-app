import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { PlanningTrip } from '../models/PlannigTrip';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  base_path = 'http://192.168.1.7:3000/planningTrip';
  compId = 1 ;
  trip1: PlanningTrip;
  tripList: PlanningTrip[] = [];

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  // Create trip planning
  createPlanTrip(trip: PlanningTrip) : Observable<PlanningTrip> {
    trip.reservationNB= 0;
   
    return this.http.post<PlanningTrip>(`${this.base_path}`,JSON.stringify(trip),this.httpOptions)
  }

  // Get list trip planning
  getListPlanTrip(companyId: number): Observable<PlanningTrip[]> {
    return this.http.get<PlanningTrip[]>(`${this.base_path}?companyId=${companyId}`)
  }
  //GET /posts/1/comments?_sort=votes&_order=asc


  // Get single planning trip data by ID
  getPlanTrip(id: number, companyId:number): Observable<PlanningTrip> {
    return this.http.get<PlanningTrip>(`${this.base_path}/${id}?companyId=${companyId}`)
}

  // Delete plannig trip by id
  deletePlanTrip(id,companyId) {
    return this.http.delete<PlanningTrip>(`${this.base_path}/${id}?companyId=${companyId}`, this.httpOptions)  
  }

  // Update planning trip
  editPlanTrip(id, trip: PlanningTrip): Observable<PlanningTrip> {
    
    return this.http.put<PlanningTrip>(`${this.base_path}/${id}`, trip,this.httpOptions)
  }


}
