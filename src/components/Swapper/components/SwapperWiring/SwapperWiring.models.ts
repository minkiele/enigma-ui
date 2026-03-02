import type { Wiring } from "../../../Enigma/Enigma.models";
import type { SwapperProps } from "../../Swapper.models";
import type { ReactNode } from "react";

export interface SwapperWiringProps<T extends Wiring> extends Pick<
  SwapperProps<T>,
  "onRemoveWiring"
> {
  wiring: T;
  disabled?: boolean;
  children?: ReactNode;
}
