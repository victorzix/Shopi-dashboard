import { TestBed } from '@angular/core/testing';
import { ICategoryService } from '../interfaces/category-service.interface';
import { CategoryService } from './category.service';
import { HttpClient } from '@angular/common/http';
import { Category } from '@core/models/categories/category.model';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { httpHeaders } from 'src/app/common/httpCommons';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('httpClient', [
      'get',
      'post',
      'delete',
      'patch',
    ]);
    TestBed.configureTestingModule({
      providers: [
        CategoryService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
    service = TestBed.inject(CategoryService);
  });

  it('should list categories', (done) => {
    const mockCategories: Category[] = [
      { id: '1', name: 'Category 1', visible: true },
      { id: '2', name: 'Category 2', visible: false },
    ];

    httpClientSpy.get.and.returnValue(of({ categories: mockCategories }));

    service.listCategories().then((response) => {
      expect(response?.categories).toEqual(mockCategories);
      expect(httpClientSpy.get).toHaveBeenCalledOnceWith(
        `${environment.apiUrl}/category/list`,
        jasmine.objectContaining({
          withCredentials: true,
          headers: jasmine.objectContaining({
            Authorization: `Bearer ${null}`,
          }),
        })
      );
      done();
    });
  });
});
