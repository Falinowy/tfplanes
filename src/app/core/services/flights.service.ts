import { Injectable, Injector, runInInjectionContext } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Flight } from 'src/app/models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  private API_URL = '/flights';

  constructor(
    private db: AngularFireDatabase,
    private injector: Injector
  ) { }

  getFlights(): Observable<Flight[]> {
    return runInInjectionContext(this.injector, () =>
      this.db.list<Flight>(this.API_URL).snapshotChanges()
        .pipe(map(response => response.map(flight => this.assignKey(flight))))
    );
  }

  getFlight(key: string): Observable<Flight> {
    return runInInjectionContext(this.injector, () =>
      this.db.object<Flight>(`${this.API_URL}/${key}`).snapshotChanges()
        .pipe(map(flight => this.assignKey(flight)))
    );
  }

  private formatForDB(flight: Partial<Flight>): any {
    return {
      ...flight,
      departureTime: this.convertToDBDate(flight.departureTime),
      returnTime: this.convertToDBDate(flight.returnTime)
    };
  }

  private convertToDBDate(dateString?: string): string {
    if (!dateString || !dateString.includes('T')) return dateString || '';
    const [datePart, timePart] = dateString.split('T');
    const [year, month, day] = datePart.split('-');
    return `${day}-${month}-${year}, ${timePart}`;
  }

  editFlight(key: string, flight: Flight) {
    const formatted = this.formatForDB(flight);
    return runInInjectionContext(this.injector, () =>
      this.db.object<Flight>(`${this.API_URL}/${key}`).update(formatted)
    );
  }

  addFlight(flight: Flight) {
    const formatted = this.formatForDB(flight);
    return runInInjectionContext(this.injector, () =>
      this.db.list<Flight>(this.API_URL).push(formatted)
    );
  }

  removeFlight(key: string): Promise<void> {
    return runInInjectionContext(this.injector, () =>
      this.db.object(`${this.API_URL}/${key}`).remove()
    );
  }

  private assignKey(action: SnapshotAction<Flight> | any): Flight {
    return { ...action.payload.val(), key: action.key } as Flight;
  }
}
