import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocatorDetailsComponent } from './locator-details.component';

describe('LocatorDetailsComponent', () => {
  let component: LocatorDetailsComponent;
  let fixture: ComponentFixture<LocatorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocatorDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocatorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
