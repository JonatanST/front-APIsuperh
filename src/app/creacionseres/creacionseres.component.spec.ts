import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionseresComponent } from './creacionseres.component';

describe('CreacionseresComponent', () => {
  let component: CreacionseresComponent;
  let fixture: ComponentFixture<CreacionseresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreacionseresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreacionseresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
