import { getHeadersForReturningJson, lookupQueryStringVariable } from "./utils";

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

  return new Response(json, { headers: getHeadersForReturningJson() });
};
