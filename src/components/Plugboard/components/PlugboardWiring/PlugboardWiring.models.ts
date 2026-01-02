import type { PlugBoardWiring } from "../../../Enigma/Enigma.models";
import type { PlugBoardProps } from "../../PlugBoard.models";

export interface PlugBoardWiringProps extends Pick<
  PlugBoardProps,
  "onRemoveWiring"
> {
  wiring: PlugBoardWiring;
}
