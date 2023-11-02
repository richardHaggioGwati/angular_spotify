import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() additionalClass: string;
  @Input() disabled: boolean;
  @Input() type: string;
}
