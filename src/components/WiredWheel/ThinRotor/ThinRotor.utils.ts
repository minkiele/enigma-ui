import type { ThinRotorType } from "../../../models";
import type { BaseRotorProps } from "../components/BaseRotor/BaseRotor.models";

export const rotorTypes = (
  ["Beta", "Gamma"] satisfies Array<ThinRotorType>
).map((rotorType) => ({
  label: rotorType,
  value: rotorType,
})) satisfies BaseRotorProps<ThinRotorType>["options"];
