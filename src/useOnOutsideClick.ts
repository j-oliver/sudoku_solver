import { RefObject, useCallback, useEffect } from 'react';

type Handler = (event: MouseEvent) => void;

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown'
): void {
  const onOutsideClick = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      const el = ref?.current;

      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(event.target as Node)) {
        return;
      }

      handler(event);
    },
    [handler, ref]
  );

  useEffect(() => {
    window.addEventListener(mouseEvent, onOutsideClick);

    return () => {
      window.removeEventListener(mouseEvent, onOutsideClick);
    };
  }, [onOutsideClick, mouseEvent]);
}
