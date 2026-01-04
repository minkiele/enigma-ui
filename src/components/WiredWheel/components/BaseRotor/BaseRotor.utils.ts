import { getLetter } from "enigma-minkiele/enigma/lib/utils";
import { createElement, type ReactNode } from "react";

const ringPositions: Array<ReactNode> = [];
for (let i = 0; i < 26; i += 1) {
  const label = `${getLetter(i)} - ${i + 1}`;
  ringPositions.push(
    createElement("option", { key: i.toString(), value: i }, label),
  );
}

export { ringPositions };
