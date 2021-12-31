export const getHeadersForReturningJson = () => {
  return {
    "content-type": "application/json;charset=UTF-8",
  };
};

export const lookupQueryStringVariable = (request, qsparam) => {
  const { searchParams } = new URL(request.url);
  return searchParams.get(qsparam);
};

export const getGamestateExpirationInSeconds = () => 60 * 60 * 24;

export const getBuzzInExpirationInMilliseconds = () => 5 * 1000;
