import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryUpdateFormComponent } from './category-update-form.component';

describe('CategoryUpdateFormComponent', () => {
  let component: CategoryUpdateFormComponent;
  let fixture: ComponentFixture<CategoryUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryUpdateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
