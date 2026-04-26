export const onRequest = async (context: any) => {
  const url = new URL(context.request.url);
  const targetPath = url.pathname.replace("/api", "");
  const targetUrl = `https://api.catarchy.net${targetPath}${url.search}`;

  return fetch(new Request(targetUrl, context.request));
};
