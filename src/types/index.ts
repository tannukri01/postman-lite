export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

export interface Header {
  key: string;
  value: string;
  enabled: boolean;
}

export interface Param {
  key: string;
  value: string;
  enabled: boolean;
}

export interface RequestData {
  id: string;
  name: string;
  method: HttpMethod;
  url: string;
  headers: Header[];
  params: Param[];
  body: string;
  bodyType: 'json' | 'text' | 'xml' | 'none';
}

export interface ResponseData {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
  time: number;
  size: number;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  requests: RequestData[];
  createdAt: number;
}
