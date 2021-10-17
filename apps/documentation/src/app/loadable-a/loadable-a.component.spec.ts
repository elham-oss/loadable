import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadableAComponent } from './loadable-a.component';

describe('LoadableAComponent', () => {
  let component: LoadableAComponent;
  let fixture: ComponentFixture<LoadableAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadableAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadableAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
