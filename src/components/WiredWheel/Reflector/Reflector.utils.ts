import { thinReflectors } from "../../Enigma/Enigma.utils";
import type { ReflectorProps } from "./Reflector.models";

export const reflectorTypes: Array<NonNullable<ReflectorProps["value"]>> = [
  "A",
  "B",
  "C",
  "Beta",
  "Gamma",
  "D",
];

export const thinReflectorTypes: Array<NonNullable<ReflectorProps["value"]>> =
  thinReflectors;
