interface Env {
  ASSETS: any;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api")) {
      const targetPath = url.pathname.replace("/api", "");
      const targetUrl = `https://api.catarchy.net${targetPath}${url.search}`;
      return fetch(new Request(targetUrl, request));
    }

    return env.ASSETS.fetch(request);
  },
};
