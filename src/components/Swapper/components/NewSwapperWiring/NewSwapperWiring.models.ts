import type { Wiring } from "../../../Enigma/Enigma.models";
import type { SwapperProps } from "../../Swapper.models";

export type NewSwapperWiringProps<T extends Wiring> = Pick<
  SwapperProps<T>,
  "onAddWiring" | "wirings" | "forbidden"
>;
