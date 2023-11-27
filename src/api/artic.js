const BASE_URL = 'https://api.artic.edu/api/v1';
const SEARCH_LIMIT = 10;
const REPLACE_STR = '$$$$';
const ARTWORKS_FIELDS = [
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
  'api_model',
];
const ARTWORK_FIELDS = [
  'id',
  'title',
  'date_display',
  'artist_display',
  'image_id',
  'description',
  'artist_title',
  'place_of_origin',
  'medium_display',
  'credit_line',
  'dimensions',
  'is_on_view',
  'main_reference_number',
  'style_title',
  'category_titles',
  'term_titles',
  'publication_history',
  'exhibition_history',
  'artist_id',
];

const ARTISTS_FIELDS = [
  'id',
  'title',
  'sort_title',
  'alt_titles',
  'birth_date',
  'death_date',
];

const ARTIST_FIELDS = [
  'id',
  'title',
  'sort_title',
  'alt_titles',
  'birth_date',
  'death_date',
];

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
      { match: { category_titles: { query: `${REPLACE_STR}` } } },
      { match: { term_titles: { query: `${REPLACE_STR}` } } },
    ],
  },
};

const ARTWORK_BY_ARTIST_QUERY = {
  bool: {
    must: [
      {
        match: {
          artist_ids: { query: `${REPLACE_STR}` },
        },
      },
    ],
  },
};

const ARTWORKS_PATH = `/artworks/search?params={"query":${JSON.stringify(
  ARTWORK_QUERY
)},"fields":"${ARTWORKS_FIELDS.join(',')}","limit":${SEARCH_LIMIT}}`;

const ARTWORK_PATH = `/artworks/${REPLACE_STR}?params={"fields":"${ARTWORK_FIELDS.join(
  ','
)}"}`;

const ARTISTS_PATH = `/agents/search?params={"query":${JSON.stringify(
  ARTIST_QUERY
)},"fields":"${ARTISTS_FIELDS.join(',')}","limit":${SEARCH_LIMIT}}`;

const ARTIST_PATH = `/agents/${REPLACE_STR}?params={"fields":"${ARTIST_FIELDS.join(
  ','
)}"}`;

const CATEGORIES_PATH = `/artworks/search?params={"query":${JSON.stringify(
  CATEGORY_QUERY
)},"fields":"${ARTWORKS_FIELDS.join(',')}","limit":${SEARCH_LIMIT}}`;

const ARTWORK_BY_ARTIST_PATH = `/artworks/search?params={"query":${JSON.stringify(
  ARTWORK_BY_ARTIST_QUERY
)},"fields":"${ARTWORKS_FIELDS.join(',')}","limit":${SEARCH_LIMIT}}`;

const apiGet = async (query, action) => {
  query = query instanceof String ? query.replace(/[^\w\s]/gi, '') : query;
  console.log('query: ', query);
  console.log('action: ', action);
  let searchUrl;

  switch (action) {
    case 'artworks':
      searchUrl = `${BASE_URL}${ARTWORKS_PATH.replaceAll(REPLACE_STR, query)}`;
      break;
    case 'artwork':
      searchUrl = `${BASE_URL}${ARTWORK_PATH.replaceAll(REPLACE_STR, query)}`;
      break;
    case 'artists':
      searchUrl = `${BASE_URL}${ARTISTS_PATH.replaceAll(REPLACE_STR, query)}`;
      break;
    case 'artist':
      searchUrl = `${BASE_URL}${ARTIST_PATH.replaceAll(REPLACE_STR, query)}`;
      break;
    case 'categories':
      searchUrl = `${BASE_URL}${CATEGORIES_PATH.replaceAll(
        REPLACE_STR,
        query
      )}`;
      break;
    case 'artwork_by_artist':
      searchUrl = `${BASE_URL}${ARTWORK_BY_ARTIST_PATH.replaceAll(
        REPLACE_STR,
        query
      )}`;
      break;
    default:
      throw new Error(`Sorry, we are out of API actions`);
  }
  console.log('url: ', searchUrl);

  const response = await fetch(`${searchUrl}`);
  const body = await response.json();

  console.log(body);

  if (body.error) {
    throw new Error(body.error);
  }

  return body;
};

export const searchArtworks = query => apiGet(query, 'artworks');

export const searchArtists = query => apiGet(query, 'artists');

export const searchCategory = query => apiGet(query, 'categories');

export const artworkByArtist = id => apiGet(id, 'artwork_by_artist');

export const instanceById = (id, action) => apiGet(id, action);
