import { useEffect } from "react";

export default function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (e) => {
      // 모달 안을 클릭했는지
      if (!ref.current || ref.current.contains(e.target)) return;
      // 모달 밖을 클릭했는지
      handler(e);
    };
    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
}
