import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintCloneComponent } from './paint-clone.component';

describe('PaintCloneComponent', () => {
  let component: PaintCloneComponent;
  let fixture: ComponentFixture<PaintCloneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaintCloneComponent]
    });
    fixture = TestBed.createComponent(PaintCloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
