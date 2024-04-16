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

// Function to get the extension from mimetype for image files
function getExtension(mimetype: any) {
  const mimeToExtensionMap: any = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'image/bmp': '.bmp',
    'image/webp': '.webp',
    'image/svg+xml': '.svg',
  };
  return mimeToExtensionMap[mimetype] || ''; // Return empty string if no mapping found
}

// Function to generate a filename for image files
export function generateFileName(file: any) {
  const timestamp = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format
  const extension = getExtension(file.mimetype); // Get extension based on mimetype
  let originalName = file.originalname || 'untitled'; // Use original name or 'untitled' if not available

  // If the original name contains an extension, separate it from the filename
  const dotIndex = originalName.lastIndexOf('.');
  if (dotIndex !== -1) {
    originalName = originalName.substring(0, dotIndex); // Extract filename without extension
  }

  return `${originalName}-${timestamp}${extension}`;
}
