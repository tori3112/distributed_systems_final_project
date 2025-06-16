import { useResource } from './useResource';

export function useAllProducts() {
  // Use a more specific path in development
  const endpoint = process.env.NODE_ENV === 'development' 
    ? '/' 
    : '/';
    
  return useResource(endpoint, {
    transformResponse: (data) => {
      if (data && data._embedded && data._embedded.packageList) {
        return data._embedded.packageList;
      }

      console.error('Unexpected API response structure:', data);
      return [];
    }
  });
}