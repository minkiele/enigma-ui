import type { MouseEvent } from "react";
import type { PlugBoardWiring } from "../Enigma/Enigma.models";

export interface PlugBoardProps {
  wirings: Array<PlugBoardWiring>;
  onRemoveWiring: (
    evt: MouseEvent<HTMLButtonElement>,
    wiring: PlugBoardWiring
  ) => void;
  onAddWiring: (
    evt: MouseEvent<HTMLButtonElement>,
    wiring: PlugBoardWiring
  ) => void;
}
