import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScoresComponent } from './components/scores/scores.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ScoresComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
