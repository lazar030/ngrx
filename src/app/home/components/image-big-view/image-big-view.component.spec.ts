import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageBigViewComponent } from './image-big-view.component';

describe('ImageBigViewComponent', () => {
  let component: ImageBigViewComponent;
  let fixture: ComponentFixture<ImageBigViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageBigViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageBigViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
