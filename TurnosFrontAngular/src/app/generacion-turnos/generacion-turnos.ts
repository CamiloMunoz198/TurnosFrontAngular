import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-generacion-turnos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './generacion-turnos.html',
  styleUrl: './generacion-turnos.css'
})
export class GeneracionTurnos {
  fechaInicio: string = '';
  fechaFin: string = '';
  idServicio: number | null = null;
  turnos: any[] = [];
  loading: boolean = false;
  error: string = '';

  @ViewChild('formTurnos') formTurnos!: NgForm;
  @ViewChild('fechaInicioInput') fechaInicioInput!: ElementRef;
  @ViewChild('fechaFinInput') fechaFinInput!: ElementRef;
  @ViewChild('idServicioInput') idServicioInput!: ElementRef;

  constructor(private http: HttpClient) {}

  buscarTurnos() {
    // Marcar el formulario como enviado
    this.formTurnos.form.markAllAsTouched();

    // Si el formulario es inválido, enfoca el primer campo vacío
    if (!this.formTurnos.form.valid) {
      if (!this.fechaInicio) {
        this.fechaInicioInput.nativeElement.focus();
      } else if (!this.fechaFin) {
        this.fechaFinInput.nativeElement.focus();
      } else if (!this.idServicio) {
        this.idServicioInput.nativeElement.focus();
      }
      return;
    }

    this.loading = true;
    this.error = '';
    const body = {
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin,
      idServicio: this.idServicio
    };
    this.http.post<any>(`${environment.apiUrl}/Turnos/GenerarTurnos`, body).subscribe({
      next: (resp) => {
        this.turnos = resp.respuesta?.Turnos || [];
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al consultar los turnos';
        this.loading = false;
      }
    });
  }
}
