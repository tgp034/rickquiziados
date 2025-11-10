import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInitComponent } from './admin-init.component';

describe('AdminInitComponent', () => {
  let component: AdminInitComponent;
  let fixture: ComponentFixture<AdminInitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminInitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
