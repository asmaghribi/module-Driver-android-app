import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Drivers } from 'src/app/models/drivers';
import { Observable, throwError, from } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { UsersCompany } from '../models/users-company';
import { Company } from '../models/company';
import { async } from '@angular/core/testing';
import { Storage } from  '@ionic/storage';
import { City } from '../models/city';
import { Trip } from '../models/trip';
import { Paypal } from '../models/paypal';
import { CreditCard } from '../models/credit-card';
import { Mobilemoney } from '../models/mobilemoney';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
   // API path
   base_path = 'http://localhost:3000';

   
  constructor(private http: HttpClient, private storage: Storage) { }
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



// Create a new item
createItem(item): Observable<Drivers> {
  return this.http
    .post<Drivers>(`${this.base_path}/driver`, JSON.stringify(item), this.httpOptions)
    .pipe(   
      retry(2),
      catchError(this.handleError)
   
      
    )
   
}

// Get single driverdata by ID
getItem(id): Observable<Drivers> {
  return this.http
    .get<Drivers>(`${this.base_path}/driver/${id}`)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  
 
  
    
}

// Get driver data
getList(): Observable<Drivers> {
  return this.http
    .get<Drivers>(`${this.base_path}/driver`)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Update item by id
updateItem(id, item): Observable<Drivers> {
  return this.http
    .put<Drivers>(`${this.base_path}/driver/${id}`, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Delete item by id
deleteItem(id) {
  return this.http
    .delete<Drivers>(`${this.base_path}/driver/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

//create usercompany 
createUsers(item): Observable<UsersCompany>{
  return this.http
    .post<UsersCompany>(`${this.base_path}/userCompany`, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )

}

//get users company data
getusers(id): Observable<UsersCompany> {
  return this.http
    .get<UsersCompany>(`${this.base_path}/userCompany`)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}


// Get users company data
getListusers(): Observable<UsersCompany> {
  return this.http
    .get<UsersCompany>(`${this.base_path}/userCompany`)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}
// Get single company by ID
getCompany( id:number): Observable<Company> {
  return this.http
    .get<Company>(`${this.base_path}/companies/${id}`)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}
getCompanies(): Observable<Company[]> {
  return this.http
    .get<Company[]>(`${this.base_path}/companies`)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}
// Get single city by ID
getCity( id:number): Observable<City> {
  return this.http
    .get<City>(`${this.base_path}/City/${id}`)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}
getCities(): Observable<City[]> {
  return this.http
    .get<City[]>(`${this.base_path}/City`)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}
// Get trip data
getTrip(villedepart: string,villearrive:string,departtime:Date): Observable<Trip[]> {
  return this.http
    .get<Trip[]>(`${this.base_path}/Trips?Departure=${villedepart}&Arrival=${villearrive}&Outbound=${departtime}`)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}
getTripbyId( id:number): Observable<Trip> {
  return this.http
    .get<Trip>(`${this.base_path}/Trips/${id}`)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}
// Create a new item
createItemMobileMoney(item): Observable<Mobilemoney> {
  return this.http
    .post<Mobilemoney>(`${this.base_path}/mobilemoneys`, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
}

// Get single Mobilemoney data by ID
getItemMobileMoney(id): Observable<Mobilemoney> {
  return this.http
    .get<Mobilemoney>(`${this.base_path}/mobilemoneys/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
}

// Get Mobilemoney data
getListMobileMoney(): Observable<Mobilemoney> {
  return this.http
    .get<Mobilemoney>(`${this.base_path}/mobilemoneys`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
}

// Update item by id
updateItemMobileMoney(id, item): Observable<Mobilemoney> {
  return this.http
    .put<Mobilemoney>(`${this.base_path}/mobilemoneys/${id}`, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
}

// Delete item by id
deleteMobileMoney(id) {
  return this.http
  .delete<Mobilemoney>(`${this.base_path}/mobilemoneys/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
}

  // ****************************************paypa************************************************/
// Create a new item
// tslint:disable-next-line: adjacent-overload-signatures
createItemPaypal(item: Paypal): Observable<Paypal> {
  return this.http
    .post<Paypal>(`${this.base_path}/paypals`, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
}

// Get single Mobilemoney data by ID
// tslint:disable-next-line: adjacent-overload-signatures
getItemPaypal(id): Observable<Paypal> {
  return this.http
    .get<Paypal>(`${this.base_path}/paypals/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
}

// Get Mobilemoney data
// tslint:disable-next-line: adjacent-overload-signatures
getListPaypal(): Observable<Paypal> {
  return this.http
    .get<Paypal>(`${this.base_path}/paypals`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
}

// Update item by id
// tslint:disable-next-line: adjacent-overload-signatures
updateItemPaypal(id: string, item: any): Observable<Paypal> {
  return this.http
    .put<Paypal>(`${this.base_path}/paypals/${id}`, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
}

// Delete item by id
// tslint:disable-next-line: adjacent-overload-signatures
deleteItemPaypal(id: string) {
  return this.http
    .delete<Paypal>(`${this.base_path}/paypals/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
}
  // ****************************************creditcard************************************************/
// Create a new item
// tslint:disable-next-line: adjacent-overload-signatures
createItemCreditCard(item: CreditCard): Observable<CreditCard> {
  return this.http
    .post<CreditCard>(`${this.base_path}/creditCards`, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
}

// Get single Mobilemoney data by ID
// tslint:disable-next-line: adjacent-overload-signatures
getItemCreditCard(id): Observable<CreditCard> {
  return this.http
    .get<CreditCard>(`${this.base_path}/creditCards/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
}

// Get Mobilemoney data
// tslint:disable-next-line: adjacent-overload-signatures
getListCreditCard(): Observable<CreditCard> {
  return this.http
    .get<CreditCard>(`${this.base_path}/creditCards`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
}

// Update item by id
// tslint:disable-next-line: adjacent-overload-signatures
updateItemCreditCard(id: string, item: any): Observable<CreditCard> {
  return this.http
    .put<CreditCard>(`${this.base_path}/creditCards/${id}`, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
}

// Delete item by id
// tslint:disable-next-line: adjacent-overload-signatures
deleteCreditCard(id: string) {
  return this.http
    .delete<CreditCard>(`${this.base_path}/creditCards/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
}
}

