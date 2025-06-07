import { useResource } from './useResource';

export function useAllProducts() {
  // Use different paths for development and production
  const endpoint = process.env.NODE_ENV === 'development' 
    ? '/api-root' 
    : '/';
    
  return useResource(endpoint, {
    // Make sure these headers match exactly what worked in curl
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    transformResponse: (data) => {
      if (data && data._embedded && data._embedded.packageList) {
        return data._embedded.packageList;
      }
      console.error('Unexpected API response structure:', data);
      return [];
    }
  });
}