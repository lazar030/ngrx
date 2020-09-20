import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocatorItemComponent } from './locator-item.component';

describe('LocatorItemComponent', () => {
  let component: LocatorItemComponent;
  let fixture: ComponentFixture<LocatorItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocatorItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocatorItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
