import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCellComponent } from './movie-cell.component';

describe('MovieCellComponent', () => {
  let component: MovieCellComponent;
  let fixture: ComponentFixture<MovieCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieCellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
