import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandMapSwitchComponent } from './expand-map-switch.component';

describe('ExpandMapSwitchComponent', () => {
  let component: ExpandMapSwitchComponent;
  let fixture: ComponentFixture<ExpandMapSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandMapSwitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandMapSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
