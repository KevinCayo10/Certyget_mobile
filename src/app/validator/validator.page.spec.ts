import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidatorPage } from './validator.page';

describe('ValidatorPage', () => {
  let component: ValidatorPage;
  let fixture: ComponentFixture<ValidatorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ValidatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
