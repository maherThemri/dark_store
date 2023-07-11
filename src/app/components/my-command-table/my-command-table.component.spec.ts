import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCommandTableComponent } from './my-command-table.component';

describe('MyCommandTableComponent', () => {
  let component: MyCommandTableComponent;
  let fixture: ComponentFixture<MyCommandTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCommandTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCommandTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
