# ThisIsJeopardy

Blazor WASM site for hosting a game of Jeopardy

# Local Development

The API is javascript run via `wrangler` (v2 in beta as of Dec 2021), which emulates Cloudflare functions on the production site. The front-end is WASM generated via Blazor. To run locally, you can use two terminals as follows:

- Terminal 1 (API via Wrangler v2)

  - `npx wrangler@beta pages dev . --port 8888 --kv GAMESTATE`

- Terminal 2 (Blazor WASM via dotnet)
  - `dotnet run`
