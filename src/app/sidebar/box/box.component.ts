import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
})
export class BoxComponent {
  @Input() additionalClass: string;
  @Input() boxText: string;
}
