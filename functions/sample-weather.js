export async function onRequestGet(context) {
  const { request, env, params, waitUntil, next, data } = context;

  const responsedata = [
    {
      date: "2021-10-31",
      temperatureC: 20,
      summary: "Balmy",
    },
    {
      date: "2021-12-25",
      temperatureC: -2,
      summary: "Chilly",
    },
  ];

  const json = JSON.stringify(responsedata, null, 2);

  return new Response(json, {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
}
