import type {
  ChangeEvent,
  KeyboardEventHandler,
  MouseEventHandler,
} from "react";

export interface KeyboardProps {
  input: string;
  output: string;
  groupBy: number;
  disabled?: boolean;
  backspaceEnabled?: boolean;
  onInput: (evt: ChangeEvent<HTMLInputElement>, input: string) => void;
  onBackspace: KeyboardEventHandler<HTMLInputElement>;
  onReset?: MouseEventHandler<HTMLButtonElement>;
}
