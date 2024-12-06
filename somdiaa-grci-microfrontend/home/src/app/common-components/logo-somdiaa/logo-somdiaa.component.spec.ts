import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoSomdiaaComponent } from './logo-somdiaa.component';

describe('LogoSomdiaaComponent', () => {
  let component: LogoSomdiaaComponent;
  let fixture: ComponentFixture<LogoSomdiaaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogoSomdiaaComponent]
    });
    fixture = TestBed.createComponent(LogoSomdiaaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
