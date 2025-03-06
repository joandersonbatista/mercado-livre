import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { MarketplaceService } from 'src/domain/services/marketplace-service';
import * as MarketplaceServiceTypes from 'src/domain/services/marketplace-service-types';
import popularKeywords from './popular-keywords-mock';

@Injectable()
export class MercadoLivreMarketplaceService implements MarketplaceService {
  private readonly MERCADO_LIVRE_API_URL = process.env.MERCADO_LIVRE_API_URL;
  private readonly LIST_ITEMS_LIMIT = 4;

  async getItem(id: string): Promise<MarketplaceServiceTypes.GetItemResult> {
    try {
      const response = await axios<MarketplaceServiceTypes.GetItemResult>(
        `${this.MERCADO_LIVRE_API_URL}/items/${id}`,
      );

      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError, 'item not found');
    }
  }

  async listItems(
    searchParam: string,
  ): Promise<MarketplaceServiceTypes.ListItemsResult> {
    try {
      const response = await axios<MarketplaceServiceTypes.ListItemsResult>(
        `${this.MERCADO_LIVRE_API_URL}/sites/MLA/search?q=celular`,
        {
          params: {
            limit: this.LIST_ITEMS_LIMIT,
            q: searchParam,
          },
        },
      );

      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  async getItemDescription(
    id: string,
  ): Promise<MarketplaceServiceTypes.DescriptionResult> {
    try {
      const response = await axios<MarketplaceServiceTypes.DescriptionResult>(
        `${this.MERCADO_LIVRE_API_URL}/items/${id}/description`,
      );

      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError, 'description not found');
    }
  }

  async getCategory(
    id: string,
  ): Promise<MarketplaceServiceTypes.CategoryResult> {
    try {
      const response = await axios<MarketplaceServiceTypes.CategoryResult>(
        `${this.MERCADO_LIVRE_API_URL}/categories/${id}`,
      );

      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError, 'category not found');
    }
  }

  popularKeywords(): string[] {
    return popularKeywords;
  }

  private handleError(
    error: AxiosError,
    notFoundMessage = 'not found',
  ): HttpException {
    if (
      error.response &&
      error.response.status === Number(HttpStatus.NOT_FOUND)
    ) {
      return new HttpException(notFoundMessage, HttpStatus.NOT_FOUND);
    }

    return new HttpException(
      'an unexpected error occurred',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
