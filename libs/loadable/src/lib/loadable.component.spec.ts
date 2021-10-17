import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoadableComponent } from './loadable.component';

describe('LoadableComponent', () => {
  let component: LoadableComponent;
  let fixture: ComponentFixture<LoadableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
