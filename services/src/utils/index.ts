import { URL } from 'url';
import { ACCESS_DENIED_MESSAGE, GENERAL_ERROR_MESSAGE } from '../constants';

export class HttpException extends Error {
  public status: number;
  public message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export const generalError = (error: HttpException) => {
  const message = error.message || GENERAL_ERROR_MESSAGE;
  return {
    status: false,
    error: message,
  };
};

export const generalErrorStatusCode = (error: any) => {
  const code = error?.status_code || 500;
  return code;
};

export const forbiddenError = () => ({
  status: false,
  message: ACCESS_DENIED_MESSAGE,
});

export const getPath = (url: string) => {
  return new URL(url).pathname;
};

export function getFilenameFromUrl(url: string) {
  const pathname = new URL(url).pathname;
  const index = pathname.lastIndexOf('/');
  return pathname.substring(index + 1); 
}
