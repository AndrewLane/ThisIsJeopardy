import {
  getGamestateExpirationInSeconds,
  getHeadersForReturningJson,
} from "./utils";

export const onRequestPost = async ({
  request,
  env,
  params,
  waitUntil,
  next,
  data,
}) => {
  const body = await request.json();

  const gameId = body.gameId;
  const playerId = body.playerId;

  const currentGameState = await env.GAMESTATE.get(gameId);
  if (!currentGameState) {
    throw Error("Game not found!");
  }

  let gameState = JSON.parse(currentGameState);
  if (playerId != gameState.playerId1 && playerId != gameState.playerId2) {
    throw Error("Unknown player!");
  }
  const buzzInTime = gameState.buzzedInTime;
  const lockOutTime = 5000; // in milliseconds
  let differenceInTime = null;
  if (buzzInTime) {
    differenceInTime = new Date() - Date.parse(buzzInTime);
  }
  let lockedOut = false;
  if (!differenceInTime || differenceInTime > lockOutTime) {
    gameState.buzzedInTime = new Date();
    gameState.buzzedInPlayer = playerId;
  } else {
    // someone else got there first...no action
    lockedOut = true;
  }
  const json = JSON.stringify(gameState);
  if (!lockedOut) {
    await env.GAMESTATE.put(gameId, json, {
      expirationTtl: getGamestateExpirationInSeconds(),
    });
  }

  return new Response(json, { headers: getHeadersForReturningJson() });
};
