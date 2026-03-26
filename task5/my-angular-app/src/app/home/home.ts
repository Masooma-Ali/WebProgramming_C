import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styles: [`
    h3 {
      color: #27ae60;
    }
    p {
      font-size: 16px;
      line-height: 1.5;
    }
  `]
})
export class Home {}