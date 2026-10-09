import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FlightsService } from 'src/app/core/services/flights.service';
import { Flight } from 'src/app/models/flight.model';
import { DetailComponent } from '../detail/detail.component';
import { NewFlightComponent } from '../new-flight/new-flight.component';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: false
})
export class FlightsComponent {
  readonly flights$: Observable<Flight[]> = this.flightsService.getFlights();

  constructor(
    private flightsService: FlightsService,
    private dialog: MatDialog
  ) {}

  openNewFlightModal(): void {
    this.dialog.open(NewFlightComponent);
  }

  showDetails(flight: Flight): void {
    this.dialog.open(DetailComponent, { data: flight });
  }
}
