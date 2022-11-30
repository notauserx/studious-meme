const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const urlHelper = (
  term: string,
  tag: string  
): string => {
  const tagTerm = tag == '' ? '' : `&tags=${tag}`;

  const url = `${API_ENDPOINT}${term}${tagTerm}`;
  console.log(url);
  return url;
}

export default urlHelper;