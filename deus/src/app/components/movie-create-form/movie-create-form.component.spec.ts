import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCreateFormComponent } from './movie-create-form.component';

describe('MovieCreateFormComponent', () => {
  let component: MovieCreateFormComponent;
  let fixture: ComponentFixture<MovieCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieCreateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
