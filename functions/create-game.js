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

  const playerId1 = body.playerId1;
  const playerId2 = body.playerId2;
  if (!playerId1 || !playerId2) {
    throw Error("Missing information to create game!");
  }
  const gameId = crypto.randomUUID();

  const existingGame = await env.GAMESTATE.get(gameId);
  if (existingGame) {
    throw Error("Game already exists!");
  }

  const gameState = {
    buzzedInPlayer: null,
    buzzedInTime: null,
    playerId1,
    playerId2,
    gameId,
  };

  const json = JSON.stringify(gameState);
  await env.GAMESTATE.put(gameId, json, {
    expirationTtl: getGamestateExpirationInSeconds(),
  });

  return new Response(json, { headers: getHeadersForReturningJson() });
};
