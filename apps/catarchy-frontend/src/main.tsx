import { envResult, EnvErrorDisplay } from "@/features/config";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

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
