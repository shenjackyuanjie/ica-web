// use bun run to run

import { serve } from "bun";

const server = serve({
  port: 3000,
  routes: {
    "/": () => new Response(Bun.file("assets/html/login.html")),
    "/static/styles.css": () => new Response(Bun.file("assets/css/login.css"),
      {
        "headers": {
          "Content-Type": "text/css"
        }
      }),
    "/static/js/dark-mode.js": () => new Response(Bun.file("assets/js/dark-mode.js"),
      {
        "headers": {
          "Content-Type": "application/javascript"
        }
      }),
  },
});

console.log(`Listening on localhost:${server.port}`);
