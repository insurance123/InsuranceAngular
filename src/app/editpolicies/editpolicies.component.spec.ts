import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpoliciesComponent } from './editpolicies.component';

describe('EditpoliciesComponent', () => {
  let component: EditpoliciesComponent;
  let fixture: ComponentFixture<EditpoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditpoliciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
