import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipServiceComponent } from './tip-service.component';

describe('TipServiceComponent', () => {
  let component: TipServiceComponent;
  let fixture: ComponentFixture<TipServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
