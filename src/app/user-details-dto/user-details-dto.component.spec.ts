import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsDtoComponent } from './user-details-dto.component';

describe('UserDetailsDtoComponent', () => {
  let component: UserDetailsDtoComponent;
  let fixture: ComponentFixture<UserDetailsDtoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDetailsDtoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsDtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
