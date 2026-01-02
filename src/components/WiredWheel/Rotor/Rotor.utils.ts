import type { RotorType } from "../../../models";
import type { BaseRotorProps } from "../components/BaseRotor/BaseRotor.models";

export const rotorTypes = (
  ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"] satisfies Array<RotorType>
).map((rotorType) => ({
  value: rotorType,
  label: rotorType,
})) satisfies BaseRotorProps<RotorType>["options"];
