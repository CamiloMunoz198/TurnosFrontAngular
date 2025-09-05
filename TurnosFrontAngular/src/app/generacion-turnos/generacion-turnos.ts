import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
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
export class GeneracionTurnos implements OnInit {
  fechaInicio: string = '';
  fechaFin: string = '';
  idServicio: number | null = null;
  servicios: any[] = [];
  turnos: any[] = [];
  loading: boolean = false;
  error: string = '';

  @ViewChild('formTurnos') formTurnos!: NgForm;
  @ViewChild('fechaInicioInput') fechaInicioInput!: ElementRef;
  @ViewChild('fechaFinInput') fechaFinInput!: ElementRef;
  @ViewChild('idServicioInput') idServicioInput!: ElementRef;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarServicios();
  }

  cargarServicios() {
    // Cambia el parámetro final (1) según corresponda
    this.http.get<any>(`${environment.apiUrl}/Turnos/CargarServicios/${environment.comercioId}`).subscribe({
      next: (resp) => {
        this.servicios = resp.respuesta?.Servicios || [];
      },
      error: () => {
        this.error = 'Error al cargar los servicios';
      }
    });
  }

  buscarTurnos() {
    this.formTurnos.form.markAllAsTouched();

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
