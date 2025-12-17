import { useState } from "react";

export function useToggleVisibility(initial = false) {
  const [visible, setVisible] = useState(initial);
  const toggle = () => setVisible((v) => !v);

  return { visible, toggle };
}
