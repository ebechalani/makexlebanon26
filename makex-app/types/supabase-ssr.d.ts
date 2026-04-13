declare module "@supabase/ssr" {
  export function createServerClient(url: string, key: string, options?: unknown): any;
  export function createBrowserClient(url: string, key: string, options?: unknown): any;
}
