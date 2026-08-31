import { NewsDetail, NewsFeed } from '../../types/newFeed.type';

export const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
export const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

export default class Api {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  async request<AjaxResponse>(): Promise<AjaxResponse> {
    const response = await fetch(this.url);
    return (await response.json()) as AjaxResponse;
  }
}

export class NewsFeedApi extends Api {
  constructor() {
    super(NEWS_URL);
  }

  async getData(): Promise<NewsFeed[]> {
    return this.request<NewsFeed[]>();
  }
}

export class NewsDetailApi extends Api {
  constructor(id: string) {
    super(CONTENT_URL.replace('@id', id));
  }

  async getData(): Promise<NewsDetail> {
    return this.request<NewsDetail>();
  }
}
