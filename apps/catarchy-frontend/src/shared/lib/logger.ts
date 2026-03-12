export const logger = {
  api: {
    request({
      path,
      method,
      requestId,
      headers,
      body,
    }: {
      path: string;
      method?: string;
      requestId?: string;
      headers?: Record<string, string>;
      body?: unknown;
    }) {
      const { background, color } = requestId
        ? requestIdColors(requestId)
        : { background: "gray", color: "white" };

      console.groupCollapsed(
        `%cAPI Request %c${requestId || ""}%c ${method} ${path}`,
        "background: white; color: black; font-size: 12px; font-weight: bold; padding: 2px 4px 2px 8px; border-top-left-radius: 8px; border-bottom-left-radius: 8px;",
        `background: ${background}; color: ${color}; font-size: 12px; font-weight: bold; padding: 2px 8px; border-top-right-radius: 8px; border-bottom-right-radius: 8px;`,
        "background: transparent; color: inherit; font-size: inherit; font-weight: inherit;",
      );
      console.log("- HEADERS : ", headers);

      if (body) {
        console.log("- BODY : ", body);
      }
      
      console.groupEnd();
    },
    response({
      path,
      status,
      statusText,
      response,
      requestId,
    }: {
      path: string;
      status: number;
      statusText: string;
      response: unknown;
      requestId?: string;
    }) {
      const statusColor =
        status >= 200 && status < 300
          ? "#277500"
          : status >= 400 && status < 500
            ? "#c79200"
            : status >= 500
              ? "#c70000"
              : "#525252";

      const requestIdColor = requestId
        ? requestIdColors(requestId)
        : { background: "gray", color: "white" };

      const errorMessage =
        typeof response === "object" &&
        response !== null &&
        "message" in response
          ? (response as Record<string, unknown>).message
          : "";

      console.groupCollapsed(
        `%cAPI Response%c${requestId || ""}%c${path}%c ${status} ${statusText} ${errorMessage ? `- ${errorMessage}` : ""}`,
        "background: white; color: black; font-size: 12px; font-weight: bold; padding: 2px 4px 2px 8px; border-top-left-radius: 8px; border-bottom-left-radius: 8px;",
        `background: ${requestIdColor.background}; color: ${requestIdColor.color}; font-size: 12px; font-weight: bold; padding: 2px 8px;`,
        `background: ${statusColor}; color: white; font-size: 12px; font-weight: bold; padding: 2px 8px; border-left: 1px solid white; border-top-right-radius: 8px; border-bottom-right-radius: 8px;`,
        "background: transparent; color: inherit; font-size: inherit; font-weight: inherit;",
      );
      console.log(response);
      console.groupEnd();
    },
  },
};

function requestIdColors(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const bgColor = `hsl(${hash % 360}, 80%, 35%)`;
  const textColor = "white";

  return {
    background: bgColor,
    color: textColor,
  };
}
