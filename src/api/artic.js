const BASE_URL = 'https://api.artic.edu/api/v1';
const SEARCH_LIMIT = 10;
const REPLACE_STR = '$$$$';
const ARTWORK_FIELDS = [
  'id',
  'title',
  'date_display',
  'artist_display',
  'artist_title',
  'place_of_origin',
  'dimensions',
  'medium_display',
  'inscriptions',
  'is_public_domain',
  'style_title',
  'classification_title',
  'image_id',
  'config',
  'category_titles',
  'term_titles',
];
const ARTIST_FIELDS = ['id', 'title'];
const ARTWORK_QUERY = {
  bool: {
    must: [
      {
        match: {
          title: { query: `${REPLACE_STR}` },
        },
      },
    ],
  },
};
const ARTIST_QUERY = {
  bool: {
    must: [
      { term: { is_artist: true } },
      { match: { title: { query: `${REPLACE_STR}` } } },
    ],
  },
};

const CATEGORY_QUERY = {
  bool: {
    should: [
      { regexp: { category_titles: `.*${REPLACE_STR}.*` } },
      { regexp: { term_titles: `.*${REPLACE_STR}.*` } },
    ],
  },
};
//{"term":{"is_public_domain":true}},

const ARTWORK_PATH = `/artworks/search?params={"query":${JSON.stringify(
  ARTWORK_QUERY
)},"fields":"${ARTWORK_FIELDS.join(',')}","limit":${SEARCH_LIMIT}}`;

const ARTIST_PATH = `/agents/search?params={"query":${JSON.stringify(
  ARTIST_QUERY
)},"fields":"${ARTIST_FIELDS.join(',')}","limit":${SEARCH_LIMIT}}`;

// const ARTIST_QUERY = `/artworks/search?params={"query":{"bool":{"must":[{"match":{"artist_title":{"query":"${REPLACE_STR}"}}}]}},"fields":"id,title,date_display,artist_display,artist_title,place_of_origin,dimensions,medium_display,inscriptions,is_public_domain,style_title,classification_title,image_id,config","limit":${SEARCH_LIMIT}}`;

const apiGet = async queryString => {
  const response = await fetch(`${queryString}`);
  const body = await response.json();

  console.log(body);

  if (body.error) {
    throw new Error(body.error);
  }

  return body;
};

const composeUrl = (query, isArtworkSearch = true) => {
  if (isArtworkSearch) {
    return `${BASE_URL}${ARTWORK_PATH.replaceAll(REPLACE_STR, query)}`;
  } else {
    return `${BASE_URL}${ARTIST_PATH.replaceAll(REPLACE_STR, query)}`;
  }
};

export const searchArtworks = query => apiGet(composeUrl(query, true));

export const searchArtists = query => apiGet(composeUrl(query, false));
