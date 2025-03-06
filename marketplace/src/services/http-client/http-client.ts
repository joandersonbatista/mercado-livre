import status from 'http-status';
import { getLocale } from 'next-intl/server';

import { Locale } from '@/i18n/routing';
import { LOCALE_CODE_MAP } from '@/utils/constants';
import { trace } from '@opentelemetry/api';

import {
  type ApiResponse,
  type SuccessResponse,
  ResponseStatus,
  ErrorResponse,
} from './http-client-types';

export class HttpClient {
  private static readonly defaultErrorResponse: ErrorResponse = {
    status: ResponseStatus.ERROR,
    errorCode: 'FETCH_FAILED',
  };

  protected static async fetchRequest<T>(path: string): Promise<ApiResponse<T>> {
    const tracer = trace.getTracer('http-client');

    return await tracer.startActiveSpan(`fetchRequest: ${path}`, async (span) => {
      try {
        const locale = (await getLocale()) as Locale;
        const localeCode = LOCALE_CODE_MAP[locale];

        const response = await fetch(`${process.env.NEXT_PUBLIC_BFF_API_URL}/${path}`, {
          headers: { 'x-user-location': localeCode },
        });

        span.setAttribute('http.url', `${process.env.NEXT_PUBLIC_BFF_API_URL}/${path}`);
        span.setAttribute('http.status_code', response.status);
        span.setAttribute('http.method', 'GET');

        if (!response.ok) return HttpClient.mapErrorStatus(response);

        const data: T = await response.json();
        return { status: ResponseStatus.SUCCESS, data } as SuccessResponse<T>;
      } catch (error) {
        span.recordException(error as DOMException);
        span.setStatus({ code: 2, message: 'Fetch Request Failed' });

        return HttpClient.defaultErrorResponse;
      } finally {
        span.end();
      }
    });
  }

  private static mapErrorStatus(response: Response): ErrorResponse {
    const mapperStatus: Record<number, ErrorResponse> = {
      [status.NOT_FOUND]: {
        status: ResponseStatus.NOT_FOUND,
        errorCode: `HTTP_${response.status}`,
      },
    };

    return mapperStatus[response.status] ?? HttpClient.defaultErrorResponse;
  }
}
