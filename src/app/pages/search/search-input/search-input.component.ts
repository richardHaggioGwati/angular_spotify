import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormService } from '../../../services/form.service';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  searchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private formDataService: FormService
  ) {
    this.searchForm = this.formBuilder.group({
      searchInput: [''],
    });
    // this.searchForm.valueChanges.subscribe(value => {
    //   this.formDataService.formValueChanged.next(value)
    // })
    this.searchForm.valueChanges.subscribe(value => {
      this.formDataService.updateFormData(value);
    });
  }
}
