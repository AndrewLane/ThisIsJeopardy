# ThisIsJeopardy

Blazor WASM site for hosting a game of Jeopardy

# Local Development

The API is javascript run via `wrangler` (v2 in beta as of Dec 2021), which emulates Cloudflare functions on the production site. The front-end is WASM generated via Blazor. To run locally, you can use the following:

`npx wrangler@beta pages dev --kv GAMESTATE --proxy 5076 -- dotnet watch run`
