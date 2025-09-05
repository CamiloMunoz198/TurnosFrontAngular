import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GeneracionTurnos } from "./generacion-turnos/generacion-turnos";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GeneracionTurnos],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'TurnosFrontAngular';
}
