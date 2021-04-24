import axios from '../_utils/customAxios';
import { APP_API } from '../redux/constants';

class ApiService {
  async uploadFile(file, type_file) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return await axios.post(APP_API + 'upload/' + type_file, formData);
  }

  async uploadLink(link, layer_name) {
    const formData = new FormData();
    formData.append('link', link);
    formData.append('layer_name', layer_name);
    return await axios.post(APP_API + 'upload/link', formData);
  }
}

const apiService = new ApiService();
Object.freeze(apiService);
export default apiService;
