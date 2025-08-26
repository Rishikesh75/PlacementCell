import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AppModule} from './app-module'
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,AppModule],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App {
  protected readonly title = signal('placementcell');
}
