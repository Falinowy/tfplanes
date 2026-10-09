import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Flight } from 'src/app/models/flight.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class DetailComponent implements OnInit {
  flight: Flight;

  constructor(
    private dialogRef: MatDialogRef<DetailComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Flight,
    private router: Router
  ) {
    this.flight = data;
  }

  ngOnInit(): void {
  }

  onCloseFlight(): void {
    this.dialogRef.close();
  }

  goToEditFlight(): void {
    this.onCloseFlight();
    this.router.navigate(['/dashboard/flights', this.flight.key]);
  }
}
