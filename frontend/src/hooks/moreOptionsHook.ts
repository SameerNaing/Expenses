import { useEffect, useState, useRef } from "react";

/** more option popover hook */
function useMoreOptions<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [showMoreOption, setShowMoreOption] = useState<string | null>();

  const onClickOutSide = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowMoreOption(null);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", onClickOutSide);
    return () => {
      document.removeEventListener("mousedown", onClickOutSide);
    };
  }, []);

  return { ref, showMoreOption, setShowMoreOption };
}

export default useMoreOptions;
