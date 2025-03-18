import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { httpHeaders } from '../../../common/httpCommons';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import ErrorHandlerUtils from '@utils/error-handler.utils';
import ToastUtils from '@utils/toast.utils';
import { ListCategoryResponse } from '../models/list-category-response.model';
import { FilterCategory } from '../models/filter-category.model';
import { CreateCategory } from '../models/create-category.model';
import { Category } from '@core/models/categories/category.model';
import { UpdateCategory } from '../models/update-category.model';

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient) {}

  async listCategories(
    filter?: FilterCategory
  ): Promise<ListCategoryResponse | null> {
    try {
      const params = new HttpParams({ fromObject: filter as any });

      const result = this.http.get<ListCategoryResponse>(
        `${environment.apiUrl}/category/list`,
        {
          params,
          ...httpHeaders,
          headers: {
            ...httpHeaders.headers,
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const response = await lastValueFrom(result);
      return response;
    } catch (err: any) {
      ErrorHandlerUtils.handleError(err);
      return null;
    }
  }

  async createCategory(dto: CreateCategory): Promise<Category | null> {
    const toastId = ToastUtils.showLoadingToast(
      'Criando categoria...',
      'Aguarde enquanto a categoria é criada.'
    );
    try {
      const result = this.http.post<Category>(
        `${environment.apiUrl}/category/create`,
        dto,
        {
          ...httpHeaders,
          headers: {
            ...httpHeaders.headers,
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      const response = await lastValueFrom(result);

      ToastUtils.dismissLoadingToast(toastId);

      ToastUtils.showToast(
        'success',
        'Categoria criada!',
        3000,
        `Categoria ${response.name} criada com sucesso.`
      );
      return response;
    } catch (err: any) {
      ToastUtils.dismissLoadingToast(toastId);
      ErrorHandlerUtils.handleError(err);
      return null;
    }
  }

  async changeCategoryVisibility(id: string): Promise<void> {
    const toastId = ToastUtils.showLoadingToast(
      `Atualizando visibilidade da categoria ${id}...`,
      'Aguarde enquanto a visibilidade é alterada.'
    );
    try {
      const result = this.http.patch<void>(
        `${environment.apiUrl}/category/change-visibility/${id}`,
        null,
        {
          ...httpHeaders,
          headers: {
            ...httpHeaders.headers,
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      await firstValueFrom(result);
      ToastUtils.dismissLoadingToast(toastId);

      ToastUtils.showToast(
        'success',
        'Categoria atualizada!',
        3000,
        `Categoria atualizada com sucesso.`
      );
    } catch (err) {
      ToastUtils.dismissLoadingToast(toastId);
      ErrorHandlerUtils.handleError(err);
    }
  }

  async updateCategory(
    id: string,
    dto: UpdateCategory
  ): Promise<Category | null> {
    const toastId = ToastUtils.showLoadingToast(
      `Atualizando categoria ${id}...`,
      'Aguarde enquanto a categoria é atualizada.'
    );
    try {
      const result = this.http.patch<Category>(
        `${environment.apiUrl}/category/update/${id}`,
        dto,
        {
          ...httpHeaders,
          headers: {
            ...httpHeaders.headers,
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      const response = await lastValueFrom(result);

      ToastUtils.dismissLoadingToast(toastId);

      ToastUtils.showToast(
        'success',
        'Categoria atualizada!',
        3000,
        `Categoria ${response.name} foi atualizada com sucesso.`
      );
      return response;
    } catch (err: any) {
      ToastUtils.dismissLoadingToast(toastId);
      ErrorHandlerUtils.handleError(err);
      return null;
    }
  }

  async deleteCategory(id: string): Promise<void> {
    const toastId = ToastUtils.showLoadingToast(
      `Removendo categoria...`,
      'Aguarde enquanto a categoria é deletada.'
    );
    try {
      const result = this.http.delete<void>(
        `${environment.apiUrl}/category/delete/${id}`,
        {
          ...httpHeaders,
          headers: {
            ...httpHeaders.headers,
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      await lastValueFrom(result);
      ToastUtils.dismissLoadingToast(toastId);

      ToastUtils.showToast('success', 'Categoria deletada!', 3000);
    } catch (err: any) {
      ToastUtils.dismissLoadingToast(toastId);
      ErrorHandlerUtils.handleError(err);
    }
  }
}
