import {
  getBuzzInExpirationInMilliseconds,
  getHeadersForReturningJson,
  lookupQueryStringVariable,
} from "./utils";

export const onRequestGet = async ({
  request,
  env,
  params,
  waitUntil,
  next,
  data,
}) => {
  const json = await env.GAMESTATE.get(
    lookupQueryStringVariable(request, "gameId")
  );
  if (!json) {
    throw Error("Game not found!");
  }
  const gameState = JSON.parse(json);

  const buzzInTime = gameState.buzzedInTime;
  let differenceInTime = null;
  if (buzzInTime) {
    differenceInTime = new Date() - Date.parse(buzzInTime);
    if (differenceInTime > getBuzzInExpirationInMilliseconds()) {
      //reset the buzz in data
      gameState.buzzedInPlayer = null;
      gameState.buzzedInTime = null;
    }
  }

  return new Response(JSON.stringify(gameState), {
    headers: getHeadersForReturningJson(),
  });
};
