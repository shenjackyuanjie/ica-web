// use bun run to run
//
import { serve } from "bun";

const server = serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);

    // Serve login page for root
    if (url.pathname === '/') {
      return new Response(Bun.file("assets/html/login.html"));
    }

    // Serve static files
    if (url.pathname.startsWith('/assets/')) {
      const filePath = `assets/${url.pathname.slice(8)}`;
      try {
        const file = Bun.file(filePath);
        if (await file.exists()) {
          return new Response(file);
        }
      } catch (e) {
        // File not found
      }
    }

    return new Response("Not Found", { status: 404 });
  },
});

function getClickableUrls(port: number): string {
  const localIPs = getLocalIPs();
  const urls = [
    `localhost:${port}`,
    `127.0.0.1:${port}`,
    ...localIPs.map(ip => `${ip}:${port}`)
  ];

  // 修正后的超链接格式
  return urls.map(url =>
    `➤ \x1B]8;;http://${url}\x1B\\http://${url}\x1B]8;;\x1B\\` // 只包裹URL部分
  ).join('\n');
}

function getLocalIPs(): string[] {
  try {
    const { networkInterfaces } = require('os');
    const nets = networkInterfaces();
    const ips: string[] = [];

    for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
        // 跳过非IPv4地址和内部地址
        if (net.family === 'IPv4' && !net.internal) {
          ips.push(net.address);
        }
      }
    }
    return [...new Set(ips)]; // 去重
  } catch {
    return []; // 如果无法获取IP则返回空数组
  }
}

console.log(`
🚀 Server started!
Available on:
${getClickableUrls(server.port)}
`);
