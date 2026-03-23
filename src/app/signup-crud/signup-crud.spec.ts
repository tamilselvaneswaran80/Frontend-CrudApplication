import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupCrud } from './signup-crud';

describe('SignupCrud', () => {
  let component: SignupCrud;
  let fixture: ComponentFixture<SignupCrud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupCrud]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupCrud);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
