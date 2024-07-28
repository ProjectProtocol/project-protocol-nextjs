import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useCallback } from "react";

/**
 * useSetSearchParams is a hook that provides a function to update the URL search params
 * and push the new URL to the router.
 *
 * For use in client components relying on URL search params as state, giving them the
 * ability to update the URL query string based on it's current value.
 */
export default function useSetSearchParams(): [
  ReadonlyURLSearchParams,
  (setterFunc: (prev: URLSearchParams) => URLSearchParams) => void
] {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const setSearchParams = useCallback(
    (setterFunc: (prev: URLSearchParams) => URLSearchParams) => {
      const prevParams = new URLSearchParams(searchParams.toString());
      const newParams = setterFunc(prevParams);
      const newParamsString = newParams.toString();
      const url = newParamsString ? `${pathname}?${newParamsString}` : pathname;

      router.replace(url);
    },
    [pathname, router, searchParams]
  );

  return [searchParams, setSearchParams];
}
