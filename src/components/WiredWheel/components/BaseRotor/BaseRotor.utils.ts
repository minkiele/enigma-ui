import { getLetter } from "enigma-minkiele/enigma/lib/utils";
import { createElement, type ReactNode } from "react";

export const ringPositions: Array<ReactNode> = Array.from({ length: 26 }).map(
  (_, i) => {
    const label = `${getLetter(i)} - ${i + 1}`;
    return createElement("option", { key: i.toString(), value: i }, label);
  },
);
