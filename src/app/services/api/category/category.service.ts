import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../../../interfaces/products/categories/category.interface';
import { environment } from '../../../../environments/environment.development';
import { httpHeaders } from '../../../common/httpCommons';
import { lastValueFrom } from 'rxjs';
import ErrorHandlerUtils from '../../../../utils/error-handler.utils';
import { IFilterCategory } from '../../../interfaces/products/categories/filter-category.interface';
import { ICreateCategory } from '../../../interfaces/products/categories/create-category.interface';
import { IUpdateCategory } from '../../../interfaces/products/categories/update-category.interface';
import ToastUtils from '../../../../utils/toast.utils';
import { IListCategoryResponse } from '../../../interfaces/products/categories/list-category-response.interface';

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient) {}

  async listCategories(
    filter?: IFilterCategory
  ): Promise<IListCategoryResponse | null> {
    try {
      const params = new HttpParams({ fromObject: filter as any });

      const result = this.http.get<IListCategoryResponse>(
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

  async createCategory(dto: ICreateCategory): Promise<ICategory | null> {
    try {
      const toastId = ToastUtils.showLoadingToast(
        'Criando categoria...',
        'Aguarde enquanto a categoria é criada.'
      );
      const result = this.http.post<ICategory>(
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
      ErrorHandlerUtils.handleError(err);
      return null;
    }
  }

  async updateCategory(
    id: string,
    dto: IUpdateCategory
  ): Promise<ICategory | null> {
    try {
      const toastId = ToastUtils.showLoadingToast(
        `Atualizando categoria ${id}...`,
        'Aguarde enquanto a categoria é atualizada.'
      );
      const result = this.http.patch<ICategory>(
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
      ErrorHandlerUtils.handleError(err);
      return null;
    }
  }

  async deleteCategory(id: string): Promise<void> {
    try {
      const toastId = ToastUtils.showLoadingToast(
        `Removendo categoria...`,
        'Aguarde enquanto a categoria é deletada.'
      );
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
      ErrorHandlerUtils.handleError(err);
    }
  }
}
