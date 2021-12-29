export async function onRequestGet(context) {
  const { request, env, params, waitUntil, next, data } = context;

  const responsedata = [
    {
      date: "2021-10-31",
      temperatureC: 20,
      summary: `Balmy at ${request.headers.get("CF-Connecting-IP")}`,
    },
    {
      date: "2021-12-25",
      temperatureC: -2,
      summary: "Chilly",
    },
  ];

  const json = JSON.stringify(responsedata, null, 2);

  const headers = {
    "content-type": "application/json;charset=UTF-8",
  };
  if (globalThis.MINIFLARE) {
    // extra CORS stuff in dev environment
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Access-Control-Allow-Methods"] = "POST,GET";
  }

  return new Response(json, { headers: headers });
}
