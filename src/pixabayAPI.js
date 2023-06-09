import axios from 'axios';

export class RequestServer {
  static url = 'https://pixabay.com/api/';
  static key = '35337679-b7947e609f482c58d47f4cd5a';
  searchImg(value, page) {
    return axios.get(
      `${RequestServer.url}?q=${value}&page=${page}&key=${RequestServer.key}&image_type=photo&orientation=horizontal&per_page=12`
    );
  }
}
