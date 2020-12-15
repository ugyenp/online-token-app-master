import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceratingComponent } from './servicerating.component';

describe('ServiceratingComponent', () => {
  let component: ServiceratingComponent;
  let fixture: ComponentFixture<ServiceratingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceratingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceratingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
