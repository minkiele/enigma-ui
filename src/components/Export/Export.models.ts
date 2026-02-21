import type { EnigmaState } from "../Enigma/Enigma.models";

export interface ExportProps extends Omit<
  EnigmaState,
  "history" | "input" | "output"
> {
  isMachineValid: boolean;
}
