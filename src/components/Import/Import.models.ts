import type { MouseEvent } from "react";
import type { ExchangeSettings } from "../Enigma/Enigma.models";

export interface ImportProps {
  onImport: (evt: MouseEvent<HTMLButtonElement>, state: ExchangeSettings) => void;
}
