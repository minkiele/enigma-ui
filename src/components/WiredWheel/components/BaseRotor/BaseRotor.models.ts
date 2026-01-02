import type { ChangeEvent, ReactNode } from "react";
import type { RotorType, ThinRotorType } from "../../../../models";

export interface BaseRotorProps<T extends RotorType | ThinRotorType> {
  type?: T;
  ringPosition?: number;
  windowLetter?: string;
  children: ReactNode;
  onChangeRotorType: (
    evt: ChangeEvent<HTMLSelectElement>,
    type: NonNullable<BaseRotorProps<T>["type"]>
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
