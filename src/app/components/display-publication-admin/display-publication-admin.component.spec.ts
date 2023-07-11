import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPublicationAdminComponent } from './display-publication-admin.component';

describe('DisplayPublicationAdminComponent', () => {
  let component: DisplayPublicationAdminComponent;
  let fixture: ComponentFixture<DisplayPublicationAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayPublicationAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayPublicationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
