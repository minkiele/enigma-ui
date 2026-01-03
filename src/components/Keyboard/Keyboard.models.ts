import type { ChangeEvent, MouseEventHandler } from "react";

export interface KeyboardProps {
  input: string;
  output: string;
  disabled?: boolean;
  onInput: (evt: ChangeEvent<HTMLInputElement>, input: string) => void;
  onReset?: MouseEventHandler<HTMLButtonElement>;
}
