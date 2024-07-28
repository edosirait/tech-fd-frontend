import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSharedComponent } from './table-shared.component';

describe('TableSharedComponent', () => {
  let component: TableSharedComponent;
  let fixture: ComponentFixture<TableSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableSharedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
