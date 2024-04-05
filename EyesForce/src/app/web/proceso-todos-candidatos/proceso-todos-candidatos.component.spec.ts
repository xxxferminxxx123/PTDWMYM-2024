import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoTodosCandidatosComponent } from './proceso-todos-candidatos.component';

describe('ProcesoTodosCandidatosComponent', () => {
  let component: ProcesoTodosCandidatosComponent;
  let fixture: ComponentFixture<ProcesoTodosCandidatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcesoTodosCandidatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesoTodosCandidatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
