import type { LampBoardProps } from "./LampBoard.models";
import { getIndex } from "enigma-minkiele/enigma/lib/utils";
import { useCallback, useEffect, useState, type FC } from "react";

const LampBoard: FC<LampBoardProps> = ({ input }) => {
  const [light, setLight] = useState(() => {
    const now = Date.now();
    return Array.from({ length: 26 }).map(() => now);
  });

  const updateLight = useCallback((letter: string) => {
    const index = getIndex(letter);
    setLight((state) => [
      ...state.slice(0, index),
      Date.now(),
      ...state.slice(index + 1),
    ]);
  }, []);

  useEffect(() => {
    if (input) {
      updateLight(input.charAt(input.length - 1));
    }
  }, [input, updateLight]);

  return <code>{JSON.stringify(light, null, "  ")}</code>;
};

export default LampBoard;
