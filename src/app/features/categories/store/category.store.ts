import { Injectable } from "@angular/core";
import { Category } from "@core/models/categories/category.model";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class CategoryStore {
  private selectedCategorySubject = new BehaviorSubject<Category | null>(null);
  public selectedCategory$: Observable<Category | null> = this.selectedCategorySubject.asObservable();

  constructor () {}

  setSelectedCategory(category: Category) {
    console.log('a')
    this.selectedCategorySubject.next(category);
  }
}
