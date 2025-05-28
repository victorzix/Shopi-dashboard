import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ErrorHandlerUtils from '@utils/error-handler.utils';
import { lastValueFrom } from 'rxjs';
import { httpHeaders } from 'src/app/common/httpCommons';
import { environment } from 'src/environments/environment.development';
import { ListProductResponse } from '../models/list-product-response.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  async listProducts(): Promise<ListProductResponse> {
    try {
      const params = new HttpParams({ fromObject: { limit: 50 } });
      const result = this.http.get<ListProductResponse>(
        `${environment.apiUrl}/product/list`,
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
      throw err;
    }
  }
}
