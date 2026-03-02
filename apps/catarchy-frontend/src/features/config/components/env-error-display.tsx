import type { EnvError } from "../lib/env";

interface EnvErrorDisplayProps {
  errors: EnvError[];
}

export function EnvErrorDisplay({ errors }: EnvErrorDisplayProps) {
  return (
    <div>
      <h1>Environment Variable Error</h1>
      <p>The following environment variables are missing or invalid:</p>
      <ul>
        {errors.map((err) => (
          <li key={err.key}>
            <strong>{err.key}</strong>: {err.message}
          </li>
        ))}
      </ul>
      <p>Please check your .env file.</p>
    </div>
  );
}
