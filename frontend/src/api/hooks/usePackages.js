import { useResource } from './useResource';

export function useAllProducts() {
  return useResource('/', {
    transformResponse: (data) => {
      if (data && data._embedded && data._embedded.packageList) {
        return data._embedded.packageList;
      }
      console.error('Unexpected API response structure:', data);
      return [];
    }
  });
}
