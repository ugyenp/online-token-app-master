import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtokenComponent } from './viewtoken.component';

describe('ViewtokenComponent', () => {
  let component: ViewtokenComponent;
  let fixture: ComponentFixture<ViewtokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewtokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewtokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
