import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavWelcomeComponent } from './nav-welcome.component';

describe('NavWelcomeComponent', () => {
  let component: NavWelcomeComponent;
  let fixture: ComponentFixture<NavWelcomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavWelcomeComponent]
    });
    fixture = TestBed.createComponent(NavWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
