import { NgModule } from '@angular/core';
import { FlightsComponent } from './flights/flights.component';
import { EditFlightComponent } from './edit-flight/edit-flight.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: FlightsComponent },
  { path: ':key', component: EditFlightComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightsRoutingModule {}
