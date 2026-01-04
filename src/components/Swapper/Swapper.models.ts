import type { Wiring } from "../Enigma/Enigma.models";
import type { MouseEvent } from "react";

export interface SwapperProps<T extends Wiring> {
  limit?: number;
  forbidden?: Array<string>;
  wirings: Array<T>;
  lifo?: boolean;
  onRemoveWiring: (evt: MouseEvent<HTMLButtonElement>, wiring: T) => void;
  onAddWiring: (evt: MouseEvent<HTMLButtonElement>, wiring: T) => void;
}
