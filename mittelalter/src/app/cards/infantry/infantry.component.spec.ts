import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfantryComponent } from './infantry.component';

describe('InfantryComponent', () => {
  let component: InfantryComponent;
  let fixture: ComponentFixture<InfantryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfantryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfantryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
