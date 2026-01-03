import type { ReflectorType } from "../../../models";
import type { BaseReflectorProps } from "../components/BaseReflector/BaseReflector.models";

export const reflectorTypes = (
  ["A", "B", "C", "Beta", "Gamma", "D"] satisfies Array<ReflectorType>
).map((rotorType) => ({
  value: rotorType,
  label: rotorType,
})) satisfies BaseReflectorProps<ReflectorType>["options"];
