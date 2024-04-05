import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosvistaComponent } from './pagosvista.component';

describe('PagosvistaComponent', () => {
  let component: PagosvistaComponent;
  let fixture: ComponentFixture<PagosvistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagosvistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosvistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
