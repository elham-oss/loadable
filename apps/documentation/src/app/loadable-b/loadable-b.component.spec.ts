import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadableBComponent } from './loadable-b.component';

describe('LoadableBComponent', () => {
  let component: LoadableBComponent;
  let fixture: ComponentFixture<LoadableBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadableBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadableBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
