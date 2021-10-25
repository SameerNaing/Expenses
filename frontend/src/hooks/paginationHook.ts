import { useRef, useEffect, useCallback, useState } from "react";

import { Status } from "../constants/status";

/** pagination hook */
function usePagination<T extends HTMLElement>(
  hasMoreData: boolean,
  paginationStatus: Status,
  pageStatus: Status,
  notDueLoading: boolean = false
) {
  const ref = useRef<T>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const handler = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];

      if (
        target.isIntersecting &&
        hasMoreData &&
        paginationStatus !== Status.Loading &&
        paginationStatus !== Status.Error &&
        !notDueLoading &&
        pageStatus === Status.Loaded
      ) {
        setPageNumber((prev) => prev + 1);
      }
    },
    [paginationStatus, hasMoreData, pageStatus, notDueLoading]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handler);
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [paginationStatus, hasMoreData, pageStatus, notDueLoading]);

  return { ref, pageNumber, setPageNumber };
}

export default usePagination;
