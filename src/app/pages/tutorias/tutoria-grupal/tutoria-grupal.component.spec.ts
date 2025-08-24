import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoriaGrupalComponent } from './tutoria-grupal.component';

describe('TutoriaGrupalComponent', () => {
  let component: TutoriaGrupalComponent;
  let fixture: ComponentFixture<TutoriaGrupalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutoriaGrupalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutoriaGrupalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
