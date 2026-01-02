import { createElement } from "react";
import type { ThinReflectorType } from "../../../models";

export const renderThinReflectorTypes = (
  ["Thin B", "Thin C"] satisfies Array<ThinReflectorType>
).map((rotorType) =>
  createElement("option", { key: rotorType, value: rotorType }, rotorType)
);
