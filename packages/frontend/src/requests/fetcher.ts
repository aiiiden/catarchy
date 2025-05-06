import { ClientError, NetworkError, ServerError } from '@/lib/error';

export async function fetcher<TData = unknown>(
  url: string,
  options?: RequestInit,
) {
  try {
    const headers = {
      'Content-Type': 'application/json',
      ...options?.headers,
    };

    const res = await fetch(`${import.meta.env.VITE_API_HOST}${url}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      // Error from server
      const error = await res.json();

      if (error?.statusCode && error?.message) {
        throw new ServerError(error.statusCode, error.message);
      }
    }

    return res.json() as Promise<TData>;
  } catch (error) {
    if (error instanceof ServerError) {
      throw error;
    }

    if (
      !navigator.onLine ||
      (error instanceof TypeError && error.message.includes('fetch'))
    ) {
      throw new NetworkError();
    }

    throw new ClientError('An unknown error occurred');
  }
}
