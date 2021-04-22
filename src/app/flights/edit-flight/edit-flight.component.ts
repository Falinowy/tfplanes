import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { FlightsService } from 'src/app/core/services/flights.service';
import { Flight } from 'src/app/models/flight.model';
import { FlightFormComponent } from '../flight-form/flight-form.component';

@Component({
  selector: 'app-edit-flight',
  templateUrl: './edit-flight.component.html',
  styleUrls: ['./edit-flight.component.css']
})
export class EditFlightComponent {
  @ViewChild('flightForm') flightForm: FlightFormComponent;
  flight: Flight;

  constructor(
    private flightsService: FlightsService,
    private toast: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router) { }

  ngAfterViewInit(): void {
    this.loadFlight();
  }

  private loadFlight() {
    const key = this.route.snapshot.params['key'];
    this.flightsService.getFlight(key)
      .pipe(tap(flight => this.flightForm.setFlight(flight)))
      .subscribe(flight => this.flight = flight);
  }
  editFlight() {
    this.flightsService.editFlight(this.flight.key, this.flightForm.form.value)
    .then(this.onEditSuccess.bind(this), this.onFailure.bind(this));
  }
  removeFlight() {
    this.flightsService.removeFlight(this.flight.key)
    .then(this.onRemoveSuccess.bind(this), this.onFailure.bind(this));

  }
  private onEditSuccess() {
    this.router.navigate(['/dashboard']);
    this.toast.open('Flight has been successfully edited!','', { panelClass: 'toast-success'})
  }
  private onRemoveSuccess() {
    this.router.navigate(['/dashboard']);
    this.toast.open('Flight has been deleted!','', { panelClass: 'toast-success'})
  }

  private onFailure(error) {
    this.toast.open(error.message,'', { panelClass: 'toast-error'});
  }
  backToFlights() {
    this.router.navigate(['/dashboard']);
  }
}
