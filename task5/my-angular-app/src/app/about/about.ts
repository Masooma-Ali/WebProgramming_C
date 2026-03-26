import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.html',
  styles: [`
    h3 {
      color: #8e44ad;
    }
    p {
      font-size: 16px;
      line-height: 1.5;
    }
  `]
})
export class About {}