import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtiquetasFormComponent } from './etiquetas-form.component';

describe('EtiquetasFormComponent', () => {
  let component: EtiquetasFormComponent;
  let fixture: ComponentFixture<EtiquetasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtiquetasFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtiquetasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
