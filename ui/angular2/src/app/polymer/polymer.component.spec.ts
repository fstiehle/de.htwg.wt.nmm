/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PolymerComponent } from './polymer.component';

describe('PolymerComponent', () => {
  let component: PolymerComponent;
  let fixture: ComponentFixture<PolymerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolymerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolymerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
