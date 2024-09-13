import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  // standalone: false,
  // imports: [RouterOutlet, AuthModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  title = 'Tip game';
  constructor(private titleService: Title) {
    titleService.setTitle(this.title);
  }
}
