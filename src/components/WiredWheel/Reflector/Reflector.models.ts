import type { ReflectorType } from "../../../models";
import type { BaseReflectorProps } from "../components/BaseReflector/BaseReflector.models";

export interface ReflectorProps extends Omit<BaseReflectorProps, "children"> {
  type: ReflectorType;
}
