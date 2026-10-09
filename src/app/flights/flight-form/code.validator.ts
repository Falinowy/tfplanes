import { UntypedFormControl, ValidationErrors } from "@angular/forms";



export const flightCodeValidator  = (formControl: UntypedFormControl): ValidationErrors | null => {
  return (formControl.value as string).startsWith('TF') ? null : { incorrectCode: true};
}
