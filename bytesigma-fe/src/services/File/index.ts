import { get, post } from '@/services/serverConfig';
import Services from '../serviceUrls';

function createImages(data: any): Promise<any> {
  return post(Services.uploadImages, {}, data);
}

function fetchImages(): Promise<any> {
  return get(`${Services.uploadImages}`);
}

const FileService = {
  createImages,
  fetchImages,
};

export default FileService;
