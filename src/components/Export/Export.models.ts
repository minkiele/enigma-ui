import type { ExchangeSettings } from "../Enigma/Enigma.models";

export interface ExportProps extends ExchangeSettings {
  isMachineValid: boolean;
}
