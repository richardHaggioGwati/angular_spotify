import { Injectable } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private formValueChanged = new Subject<string>();

  formValueChanged$ = this.formValueChanged
    .asObservable()
    .pipe(debounceTime(500));

  updateFormData(data: string) {
    this.formValueChanged.next(data);
  }
}
