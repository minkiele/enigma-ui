import type { ThinReflectorType } from "../../../models";
import type { BaseReflectorProps } from "../components/BaseReflector/BaseReflector.models";

export interface ThinReflectorProps extends Omit<BaseReflectorProps, 'children'> {
  type: ThinReflectorType;
}
