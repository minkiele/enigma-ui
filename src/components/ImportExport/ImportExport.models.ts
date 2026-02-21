import type { MouseEvent } from "react";
import type { EnigmaState } from "../Enigma/Enigma.models";

type ExportableState = Omit<
  EnigmaState,
  "history" | "input" | "output"
>;

export interface ImportExportProps extends ExportableState {
  isMachineValid: boolean;
  onImport: (evt: MouseEvent<HTMLButtonElement>, state: ExportableState) => void;
}
