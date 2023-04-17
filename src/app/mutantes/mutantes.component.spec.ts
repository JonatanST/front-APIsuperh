import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutantesComponent } from './mutantes.component';

describe('MutantesComponent', () => {
  let component: MutantesComponent;
  let fixture: ComponentFixture<MutantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MutantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MutantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
