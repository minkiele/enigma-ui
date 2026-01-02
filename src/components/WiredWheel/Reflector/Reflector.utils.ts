import { createElement } from "react";
import type { ReflectorType } from "../../../models";

export const reflectorTypes = (
  ["A", "B", "C", "Beta", "Gamma"] satisfies Array<ReflectorType>
).map((rotorType) =>
  createElement("option", { key: rotorType, value: rotorType }, rotorType)
);
