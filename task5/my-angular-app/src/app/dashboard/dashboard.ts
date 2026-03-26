import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.html',
  styles: [`
    .dashboard-container {
      padding: 20px;
      background-color: #ffffff;
      margin: 20px auto;
      max-width: 800px;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }
    .child-container {
      margin-top: 20px;
      padding: 15px;
      background-color: #ecf0f1;
      border-radius: 8px;
    }
  `]
})
export class Dashboard {}