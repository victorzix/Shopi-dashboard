import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSubcategoryFormComponent } from './update-subcategory-form.component';

describe('UpdateSubcategoryFormComponent', () => {
  let component: UpdateSubcategoryFormComponent;
  let fixture: ComponentFixture<UpdateSubcategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateSubcategoryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSubcategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
