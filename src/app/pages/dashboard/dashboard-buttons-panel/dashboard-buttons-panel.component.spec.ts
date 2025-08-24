import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardButtonsPanelComponent } from './dashboard-buttons-panel.component';

describe('DashboardButtonsPanelComponent', () => {
  let component: DashboardButtonsPanelComponent;
  let fixture: ComponentFixture<DashboardButtonsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardButtonsPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardButtonsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
