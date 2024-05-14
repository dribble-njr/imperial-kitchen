import querystring from 'node:querystring';

export const getQueryParams = (url: string | undefined) => {
  if (!url) return {};

  const query = url.split('?')[1];

  return querystring.parse(query);
};
