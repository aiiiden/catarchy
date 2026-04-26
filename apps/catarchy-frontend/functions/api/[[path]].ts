export const onRequest = async (context: any) => {
  const url = new URL(context.request.url);
  const targetPath = url.pathname.replace("/api", "");
  const targetUrl = `${context.env.API_URL}${targetPath}${url.search}`;

  return fetch(targetUrl, {
    method: context.request.method,
    headers: context.request.headers,
    body: context.request.body,
  });
};
