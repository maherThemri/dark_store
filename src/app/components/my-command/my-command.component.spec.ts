import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCommandComponent } from './my-command.component';

describe('MyCommandComponent', () => {
  let component: MyCommandComponent;
  let fixture: ComponentFixture<MyCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCommandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
