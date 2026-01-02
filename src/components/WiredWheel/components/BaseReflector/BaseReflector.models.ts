import type { ChangeEvent } from "react";
import type { ReflectorType, ThinReflectorType } from "../../../../models";

export interface BaseReflectorProps<
  T extends ReflectorType | ThinReflectorType
> {
  value: T;
  options: Array<{ value: T; label: string }>;
  onChangeType: (evt: ChangeEvent<HTMLSelectElement>, type: T) => void;
}
