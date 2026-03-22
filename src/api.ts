export const API_BASE = "https://localhost:7777";

const defaultInit: RequestInit = { credentials: "include" };

export async function api<T>(
  path: string,
  init?: RequestInit & { parseText?: boolean },
  signal?: AbortSignal,
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...defaultInit,
    ...init,
    signal: signal ?? null,
  });

  // 204 No Content
  if (res.status === 204) return undefined as T;

  // единообразные ошибки
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `${res.status} ${res.statusText}`);
  }

  if (init?.parseText) {
    return (await res.text()) as T;
  }

  return (await res.json()) as T;
}

// POST
export const post = <TReq, TRes>(
  path: string,
  body: TReq,
  init?: RequestInit,
) =>
  api<TRes>(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    body: JSON.stringify(body),
    ...init,
  });

  //delete

  export const del = <TRes>(path: string, init?: RequestInit) =>
  api<TRes>(path, {
    method: "DELETE",
    headers: {
      ...(init?.headers ?? {}),
    },
    ...init,
  });
