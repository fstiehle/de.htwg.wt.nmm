/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PuckComponent } from './puck.component';

describe('PuckComponent', () => {
  let component: PuckComponent;
  let fixture: ComponentFixture<PuckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
