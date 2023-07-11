import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPublicationComponent } from './my-publication.component';

describe('MyPublicationComponent', () => {
  let component: MyPublicationComponent;
  let fixture: ComponentFixture<MyPublicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPublicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
