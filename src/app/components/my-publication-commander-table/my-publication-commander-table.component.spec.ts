import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPublicationCommanderTableComponent } from './my-publication-commander-table.component';

describe('MyPublicationCommanderTableComponent', () => {
  let component: MyPublicationCommanderTableComponent;
  let fixture: ComponentFixture<MyPublicationCommanderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPublicationCommanderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPublicationCommanderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
