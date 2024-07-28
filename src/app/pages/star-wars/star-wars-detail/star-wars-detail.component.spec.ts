import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarWarsDetailComponent } from './star-wars-detail.component';

describe('StarWarsDetailComponent', () => {
  let component: StarWarsDetailComponent;
  let fixture: ComponentFixture<StarWarsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarWarsDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarWarsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
