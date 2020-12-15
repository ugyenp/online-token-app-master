import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpDialogueComponent } from './otp-dialogue.component';

describe('OtpDialogueComponent', () => {
  let component: OtpDialogueComponent;
  let fixture: ComponentFixture<OtpDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
