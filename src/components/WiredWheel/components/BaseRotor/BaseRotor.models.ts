import type { ChangeEvent } from "react";
import type { RotorType, ThinRotorType } from "../../../../models";

export interface BaseRotorProps<T extends RotorType | ThinRotorType> {
  value?: T;
  ringPosition?: number;
  windowLetter?: string;
  options: Array<{ value: T; label: string; disabled?: boolean }>;
  onChangeRotorType: (
    evt: ChangeEvent<HTMLSelectElement>,
    type: NonNullable<BaseRotorProps<T>["value"]>
  ) => void;
  onChangeRingPosition: (
    evt: ChangeEvent<HTMLSelectElement>,
    ringPosition: NonNullable<BaseRotorProps<T>["ringPosition"]>
  ) => void;
  onChangeWindowLetter: (
    evt: ChangeEvent<HTMLInputElement>,
    windowLetter: NonNullable<BaseRotorProps<T>["windowLetter"]>
  ) => void;
}
