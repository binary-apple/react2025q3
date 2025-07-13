export function getResponse(searchString: string = '') {
  const baseUrl = 'https://potterapi-fedeperin.vercel.app/en/characters';
  const params = new URLSearchParams();
  params.append('search', searchString);
  const url = searchString ? `${baseUrl}?${params}` : baseUrl;
  const response = fetch(url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  });
  return response;
}
