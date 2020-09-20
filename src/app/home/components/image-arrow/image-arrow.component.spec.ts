import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageArrowComponent } from './image-arrow.component';

describe('ImageArrowComponent', () => {
  let component: ImageArrowComponent;
  let fixture: ComponentFixture<ImageArrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageArrowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
