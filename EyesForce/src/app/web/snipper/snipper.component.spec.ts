import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnipperComponent } from './snipper.component';

describe('SnipperComponent', () => {
  let component: SnipperComponent;
  let fixture: ComponentFixture<SnipperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnipperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnipperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
