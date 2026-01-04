import type { ReflectorType, ThinReflectorType } from "../../../models";
import type { ReflectorWiring } from "../../Enigma/Enigma.models";
import type { ChangeEvent, MouseEvent } from "react";

export interface ReflectorProps {
  value?: ReflectorType | ThinReflectorType;
  all?: boolean;
  wirings?: Array<ReflectorWiring>;
  onChangeType: (
    evt: ChangeEvent<HTMLSelectElement>,
    type: ReflectorType | ThinReflectorType,
  ) => void;
  onAddWiring: (
    evt: MouseEvent<HTMLButtonElement>,
    wiring: ReflectorWiring,
  ) => void;
  onRemoveWiring: (
    evt: MouseEvent<HTMLButtonElement>,
    wiring: ReflectorWiring,
  ) => void;
}
