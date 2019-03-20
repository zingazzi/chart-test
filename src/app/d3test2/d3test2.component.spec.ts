import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D3test2Component } from './d3test2.component';

describe('D3test2Component', () => {
  let component: D3test2Component;
  let fixture: ComponentFixture<D3test2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3test2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3test2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
