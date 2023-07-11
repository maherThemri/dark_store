import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPublicationTableComponent } from './my-publication-table.component';

describe('MyPublicationTableComponent', () => {
  let component: MyPublicationTableComponent;
  let fixture: ComponentFixture<MyPublicationTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPublicationTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPublicationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
