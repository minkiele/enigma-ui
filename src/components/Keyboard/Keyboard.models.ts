import type { ChangeEvent } from "react";

export interface KeyboardProps {
  lastEncodedLetter: string;
  onInput: (evt: ChangeEvent<HTMLInputElement>, input: string) => void;
}

export interface KeyboardState {
  inputLetter: string;
  input: string;
  output: string;
  pendingInputLetter: string;
  groupBy: number;
}
