import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorItemComponent } from './vendor-item.component';

describe('VendorItemComponent', () => {
  let component: VendorItemComponent;
  let fixture: ComponentFixture<VendorItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
