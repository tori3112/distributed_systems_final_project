import { useResource } from './useResource';

export function useAllProducts() {
  return useResource('/accoms/', {
    transformResponse: (data) => {
      if (data && data._embedded && data._embedded.accomodationList) {
        return data._embedded.accomodationList;
      }
      console.error('Unexpected API response structure:', data);
      return [];
    }
  });
}
