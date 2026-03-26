import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.html'
})
export class Child {
  @Input() text!: string;
}