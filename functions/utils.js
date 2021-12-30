export const getHeadersForReturningJson = () => {
  const headers = {
    "content-type": "application/json;charset=UTF-8",
  };
  if (globalThis.MINIFLARE) {
    // extra CORS stuff in dev environment
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Access-Control-Allow-Methods"] = "POST,GET";
  }
  return headers;
};

export const lookupQueryStringVariable = (request, qsparam) => {
  const { searchParams } = new URL(request.url);
  return searchParams.get(qsparam);
};

export const getGamestateExpirationInSeconds = () => 60 * 60 * 24;
