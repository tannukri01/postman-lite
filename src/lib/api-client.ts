import { RequestData, ResponseData, Header, Param } from '@/types';

function buildUrlWithParams(url: string, params: Param[]): string {
  const enabledParams = params.filter((p) => p.enabled && p.key);
  if (enabledParams.length === 0) return url;

  const urlObj = new URL(url);
  enabledParams.forEach((param) => {
    urlObj.searchParams.append(param.key, param.value);
  });
  return urlObj.toString();
}

function buildHeaders(headers: Header[]): Record<string, string> {
  const result: Record<string, string> = {};
  headers
    .filter((h) => h.enabled && h.key)
    .forEach((h) => {
      result[h.key] = h.value;
    });
  return result;
}

export async function makeRequest(request: RequestData): Promise<ResponseData> {
  const startTime = performance.now();

  const url = buildUrlWithParams(request.url, request.params);
  const headers = buildHeaders(request.headers);

  const fetchOptions: RequestInit = {
    method: request.method,
    headers,
  };

  if (request.method !== 'GET' && request.method !== 'HEAD' && request.body && request.bodyType !== 'none') {
    fetchOptions.body = request.body;
  }

  try {
    const response = await fetch(url, fetchOptions);
    const endTime = performance.now();

    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    const contentType = response.headers.get('content-type') || '';
    let body = '';

    if (contentType.includes('application/json')) {
      const json = await response.json();
      body = JSON.stringify(json, null, 2);
    } else {
      body = await response.text();
    }

    return {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
      body,
      time: Math.round(endTime - startTime),
      size: new Blob([body]).size,
    };
  } catch (error) {
    const endTime = performance.now();
    return {
      status: 0,
      statusText: 'Network Error',
      headers: {},
      body: error instanceof Error ? error.message : 'Unknown error occurred',
      time: Math.round(endTime - startTime),
      size: 0,
    };
  }
}
