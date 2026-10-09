import { Component, Input, Self, Optional, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css'],
  standalone: false
})
export class FormInputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() icon = '';
  @Input() placeholder = '';
  @Input() type = 'text'; // can be 'text', 'textarea', 'select', 'datetime-local'
  @Input() options: {label: string, value: any}[] = [];
  @Input() transform: 'uppercase' | 'none' = 'none';
  @Input() maxlength?: number;

  value: any = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(
    @Optional() @Self() public controlDir: NgControl,
    private cdr: ChangeDetectorRef
  ) {
    if (this.controlDir) {
      this.controlDir.valueAccessor = this;
    }
  }

  onModelChange(val: any): void {
    if (this.transform === 'uppercase' && typeof val === 'string') {
      val = val.toUpperCase();
    }
    this.value = val;
    this.onChange(val);
  }

  writeValue(val: any): void {
    this.value = val !== undefined && val !== null ? val : '';
    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  getErrorMessage(): string {
    if (!this.controlDir || !this.controlDir.control) return '';
    const errors = this.controlDir.control.errors;
    if (!errors) return '';

    if (errors['required']) return `${this.label} is required`;
    if (errors['minlength']) return `Minimum length is ${errors['minlength'].requiredLength} chars`;
    if (errors['maxlength']) return `Maximum length is ${errors['maxlength'].requiredLength} chars`;
    if (errors['incorrectCode']) return `Must start with TF prefix`;
    
    return 'Invalid field';
  }
}
