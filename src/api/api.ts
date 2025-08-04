const PAGE_LIMIT = 4;

export function getSearchResultsByPage(
  searchString: string,
  currentPage: number
) {
  const baseUrl = 'https://potterapi-fedeperin.vercel.app/en/characters';
  const params = new URLSearchParams();
  if (searchString) {
    params.append('search', searchString);
  }
  params.append('page', String(currentPage));
  params.append('max', String(PAGE_LIMIT));
  const url = `${baseUrl}?${params}`;
  const response = fetch(url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  });
  return response;
}

export function getCharacterById(index: number) {
  const baseUrl = 'https://potterapi-fedeperin.vercel.app/en/characters';
  const params = new URLSearchParams();
  params.append('index', String(index));
  const url = `${baseUrl}?${params}`;
  const response = fetch(url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  });
  return response;
}
