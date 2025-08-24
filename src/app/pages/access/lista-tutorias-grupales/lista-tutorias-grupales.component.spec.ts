import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTutoriasGrupalesComponent } from './lista-tutorias-grupales.component';

describe('ListaTutoriasGrupalesComponent', () => {
  let component: ListaTutoriasGrupalesComponent;
  let fixture: ComponentFixture<ListaTutoriasGrupalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaTutoriasGrupalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaTutoriasGrupalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
