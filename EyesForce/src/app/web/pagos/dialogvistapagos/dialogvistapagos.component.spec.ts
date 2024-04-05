import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogvistapagosComponent } from './dialogvistapagos.component';

describe('DialogvistapagosComponent', () => {
  let component: DialogvistapagosComponent;
  let fixture: ComponentFixture<DialogvistapagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogvistapagosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogvistapagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
