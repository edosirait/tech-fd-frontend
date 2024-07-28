import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarWarsListComponent } from './star-wars-list.component';

describe('StarWarsListComponent', () => {
  let component: StarWarsListComponent;
  let fixture: ComponentFixture<StarWarsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarWarsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarWarsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
