import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { FormInputComponent } from './components/form-input/form-input.component';

@NgModule({
  declarations: [FormInputComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
  exports: [FormInputComponent]
})
export class SharedModule {}
