import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneracionTurnos } from './generacion-turnos';

describe('GeneracionTurnos', () => {
  let component: GeneracionTurnos;
  let fixture: ComponentFixture<GeneracionTurnos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneracionTurnos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneracionTurnos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
