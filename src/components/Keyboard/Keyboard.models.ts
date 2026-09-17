import type { EnigmaType } from "../../models";
import type {
  ChangeEvent,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
} from "react";

export interface KeyboardProps {
  input: string;
  output: string;
  groupBy: number;
  disabled?: boolean;
  backspaceEnabled?: boolean;
  type: EnigmaType;
  onInput: (evt: ChangeEvent<HTMLInputElement>, input: string) => void;
  onBackspace: KeyboardEventHandler<HTMLInputElement>;
  onReset?: MouseEventHandler<HTMLButtonElement>;
  onApplyEncodeKey?: (evt: MouseEvent<HTMLButtonElement>, key: string) => void;
  onApplyDecodeKey?: (evt: MouseEvent<HTMLButtonElement>, key: string) => void;
}
