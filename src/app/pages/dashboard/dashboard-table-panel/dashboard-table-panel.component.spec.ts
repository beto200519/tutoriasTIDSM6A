import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTablePanelComponent } from './dashboard-table-panel.component';

describe('DashboardTablePanelComponent', () => {
  let component: DashboardTablePanelComponent;
  let fixture: ComponentFixture<DashboardTablePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTablePanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTablePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
