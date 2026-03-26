import { Component } from '@angular/core';

@Component({
  selector: 'app-feedback',
  standalone: true,
  templateUrl: './feedback.html',
  styles: [`
    h3 {
      color: #e67e22;
    }
    p {
      font-size: 16px;
      line-height: 1.5;
    }
  `]
})
export class Feedback {}