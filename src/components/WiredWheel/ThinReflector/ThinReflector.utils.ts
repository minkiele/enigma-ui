import type { ThinReflectorType } from "../../../models";
import type { BaseReflectorProps } from "../components/BaseReflector/BaseReflector.models";

export const reflectorTypes = (
  ["Thin B", "Thin C"] satisfies Array<ThinReflectorType>
).map((rotorType) => ({
  value: rotorType,
  label: rotorType,
})) satisfies BaseReflectorProps<ThinReflectorType>["options"];
