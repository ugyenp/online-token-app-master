import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenServiceComponent } from './token-service.component';

describe('TokenServiceComponent', () => {
  let component: TokenServiceComponent;
  let fixture: ComponentFixture<TokenServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
