import { EnvErrorDisplay, envResult } from "@/features/config";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

// biome-ignore lint/style/noNonNullAssertion: root element is guaranteed to exist in index.html
const rootElement = document.getElementById("root")!;

if (!envResult.success) {
  createRoot(rootElement).render(
    <StrictMode>
      <EnvErrorDisplay errors={envResult.errors} />
    </StrictMode>,
  );
} else {
  import("./app").then(({ default: renderApp }) => renderApp(rootElement));
}
