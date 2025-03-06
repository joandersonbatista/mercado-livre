export enum ResponseStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  NOT_FOUND = 'not_found',
}

export type SuccessResponse<T> = {
  status: ResponseStatus.SUCCESS;
  data: T;
};

export type ErrorResponse = {
  status: ResponseStatus.ERROR | ResponseStatus.NOT_FOUND;
  errorCode: string;
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
