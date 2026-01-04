import type { ChangeEvent } from "react";

export interface UhrProps {
  uhrSetting?: number;
  onPlugUhr: (evt: ChangeEvent<HTMLInputElement>) => void;
  onUnplugUhr: (evt: ChangeEvent<HTMLInputElement>) => void;
  onSetUhrSetting: (
    evt: ChangeEvent<HTMLSelectElement>,
    setting: number,
  ) => void;
}
