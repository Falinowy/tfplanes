import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FlightsService } from 'src/app/core/services/flights.service';
import { Flight } from 'src/app/models/flight.model';
import { DetailComponent } from '../detail/detail.component';
import { NewFlightComponent } from '../new-flight/new-flight.component'

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent {
  flights$: Observable<Flight[]> = this.flightsService.getFlights();
  constructor(private flightsService: FlightsService, private dialog: MatDialog) { }

  openNewFlightModal() {
    this.dialog.open(NewFlightComponent)
  }

  showDetails(flight) {
    this.dialog.open(DetailComponent, { data: flight } );
  }
}
