import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FlightsService } from 'src/app/core/services/flights.service';
import { FlightFormComponent } from '../flight-form/flight-form.component';

@Component({
  selector: 'app-new-flight',
  templateUrl: './new-flight.component.html',
  styleUrls: ['./new-flight.component.css']
})
export class NewFlightComponent implements OnInit {
  @ViewChild('flightForm') flightForm: FlightFormComponent;
  constructor(private dialogRef: MatDialogRef<NewFlightComponent>, private flightsService: FlightsService,
    private toast: MatSnackBar) { }

  ngOnInit(): void {
  }

  createFlight() {
    this.flightsService.addFlight(this.flightForm.form.value)
    .then(this.onCreatingSuccess.bind(this), this.onCreatingFailure.bind(this));
  }

  private onCreatingSuccess() {
    this.dialogRef.close();
    this.toast.open('Flight has been successfully created!','', { panelClass: 'toast-success'})
  }

  private onCreatingFailure(error) {
    this.toast.open(error.message,'', { panelClass: 'toast-error'});
  }
}
