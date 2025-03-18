import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubcategoryFormComponent } from './create-subcategory-form.component';

describe('CreateSubcategoryFormComponent', () => {
  let component: CreateSubcategoryFormComponent;
  let fixture: ComponentFixture<CreateSubcategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSubcategoryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSubcategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
