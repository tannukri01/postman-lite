import { create } from 'zustand';
import { RequestData, ResponseData, HttpMethod } from '@/types';

interface RequestState {
  currentRequest: RequestData;
  response: ResponseData | null;
  isLoading: boolean;
  
  setMethod: (method: HttpMethod) => void;
  setUrl: (url: string) => void;
  setBody: (body: string) => void;
  setBodyType: (type: 'json' | 'text' | 'xml' | 'none') => void;
  setHeaders: (headers: RequestData['headers']) => void;
  setParams: (params: RequestData['params']) => void;
  setResponse: (response: ResponseData | null) => void;
  setLoading: (loading: boolean) => void;
  loadRequest: (request: RequestData) => void;
  resetRequest: () => void;
}

const defaultRequest: RequestData = {
  id: '',
  name: 'New Request',
  method: 'GET',
  url: 'https://jsonplaceholder.typicode.com/posts/1',
  headers: [{ key: 'Content-Type', value: 'application/json', enabled: true }],
  params: [],
  body: '',
  bodyType: 'json',
};

export const useRequestStore = create<RequestState>((set) => ({
  currentRequest: defaultRequest,
  response: null,
  isLoading: false,

  setMethod: (method) =>
    set((state) => ({
      currentRequest: { ...state.currentRequest, method },
    })),

  setUrl: (url) =>
    set((state) => ({
      currentRequest: { ...state.currentRequest, url },
    })),

  setBody: (body) =>
    set((state) => ({
      currentRequest: { ...state.currentRequest, body },
    })),

  setBodyType: (bodyType) =>
    set((state) => ({
      currentRequest: { ...state.currentRequest, bodyType },
    })),

  setHeaders: (headers) =>
    set((state) => ({
      currentRequest: { ...state.currentRequest, headers },
    })),

  setParams: (params) =>
    set((state) => ({
      currentRequest: { ...state.currentRequest, params },
    })),

  setResponse: (response) => set({ response }),
  setLoading: (isLoading) => set({ isLoading }),

  loadRequest: (request) => set({ currentRequest: request }),

  resetRequest: () => set({ currentRequest: defaultRequest, response: null }),
}));
