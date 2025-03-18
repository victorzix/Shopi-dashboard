import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategoryFloatButtonComponent } from './create-category-float-button.component';

describe('CreateCategoryFloatButtonComponent', () => {
  let component: CreateCategoryFloatButtonComponent;
  let fixture: ComponentFixture<CreateCategoryFloatButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCategoryFloatButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCategoryFloatButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
