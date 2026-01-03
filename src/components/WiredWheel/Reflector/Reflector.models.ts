import type { MouseEvent } from "react";
import type { ReflectorType } from "../../../models";
import type { ReflectorWiring } from "../../Enigma/Enigma.models";
import type { BaseReflectorProps } from "../components/BaseReflector/BaseReflector.models";

export interface ReflectorProps
  extends Omit<BaseReflectorProps<ReflectorType>, "options"> {
  wirings?: Array<ReflectorWiring>;
  onAddWiring: (evt: MouseEvent<HTMLButtonElement>, wiring: ReflectorWiring) => void;
  onRemoveWiring: (evt: MouseEvent<HTMLButtonElement>, wiring: ReflectorWiring) => void;
}
