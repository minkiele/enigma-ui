import type { ChangeEvent, ReactNode } from "react";
import type { ReflectorType, ThinReflectorType } from "../../../../models";

export interface BaseReflectorProps {
  type: ReflectorType | ThinReflectorType;
  children: ReactNode;
  onChangeType: (evt: ChangeEvent<HTMLSelectElement>, type: ReflectorType | ThinReflectorType) => void;
}
