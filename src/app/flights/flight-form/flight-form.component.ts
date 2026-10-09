import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Crew, Flight } from 'src/app/models/flight.model';
import { flightCodeValidator } from './code.validator';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: false
})
export class FlightFormComponent implements OnInit {
  @Input() editMode = false;
  form!: FormGroup;

  readonly jobs = [
    { label: 'Stewardess', value: 'stewardess' },
    { label: 'Senior Cabin Crew', value: 'senior_cabin_crew' },
    { label: 'Pilot', value: 'pilot' },
    { label: 'Co-Pilot', value: 'co_pilot' },
    { label: 'Mechanic', value: 'mechanic' }
  ];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  setFlight(flight: Flight): void {
    const { key, ...formData } = flight;
    
    // Parse dates to standard ISO if they are in DD-MM-YYYY, HH:mm format
    formData.departureTime = this.convertToInputDate(formData.departureTime);
    formData.returnTime = this.convertToInputDate(formData.returnTime);

    this.form.patchValue(formData);
    
    this.crew.clear();
    formData.crew?.forEach(crewMember => this.addCrewMember(crewMember));
  }

  private convertToInputDate(dateString: string): string {
    if (!dateString) return '';
    if (dateString.includes('T')) return dateString;
    
    const parts = dateString.split(',');
    const datePart = parts[0].trim();
    const timePart = parts[1] ? parts[1].trim() : '00:00';
    
    const dateSegments = datePart.split('-');
    if (dateSegments.length === 3) {
      return `${dateSegments[2]}-${dateSegments[1]}-${dateSegments[0]}T${timePart}`;
    }
    return dateString;
  }

  get crew(): FormArray {
    return this.form.get('crew') as FormArray;
  }

  removeCrewMember(index: number): void {
    this.crew.removeAt(index);
  }

  addCrewMember(crewMember?: Crew): void {
    this.crew.push(this.buildCrewMember(crewMember));
  }

  private buildCrewMember(crewMember: Partial<Crew> = {}): FormGroup {
    return this.formBuilder.group({
      name: [crewMember.name || '', { validators: [Validators.required] }],
      job: [crewMember.job || '', { validators: [Validators.required] }]
    });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      origin: ['', { validators: [Validators.required] }],
      destination: ['', { validators: [Validators.required] }],
      departureTime: ['', { validators: [Validators.required] }],
      returnTime: ['', { validators: [Validators.required] }],
      code: ['TF', { validators: [Validators.required, Validators.maxLength(4), Validators.minLength(2), flightCodeValidator] }],
      additionalInformation: [''],
      withSKPlanesDiscount: [false],
      crew: this.formBuilder.array(this.editMode ? [] : [this.buildCrewMember()])
    });
  }
}
