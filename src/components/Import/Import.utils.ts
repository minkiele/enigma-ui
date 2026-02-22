import { getLetter } from "enigma-minkiele/enigma/lib/utils";
import {
  enum as zen,
  object as zob,
  number as znum,
  gte,
  lte,
  optional as opt,
  array as zar,
  length as len,
  minLength as lgte,
  maxLength as llte,
} from "zod/mini";

const alphabetValidationSchema = zen(
  Array.from({ length: 26 }).map((_, i) => getLetter(i)),
);

const rotorValidationSchema = zob({
  type: zen([
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "Beta",
    "Gamma",
  ]),
  ringPosition: znum().check(gte(0), lte(25)),
  windowLetter: alphabetValidationSchema,
});

const optionalRotorValidationSchema = opt(rotorValidationSchema);

const wireableValidationSchema = zar(
  zar(alphabetValidationSchema).check(len(2)),
);

const validationSchema = zob({
  type: zen(["M3", "M4"]),
  reflector: opt(
    zob({
      type: zen(["A", "B", "C", "Beta", "Gamma", "D", "Thin B", "Thin C"]),
      wirings: wireableValidationSchema.check(lgte(0), llte(12)),
    }),
  ),
  fourthRotor: optionalRotorValidationSchema,
  leftRotor: optionalRotorValidationSchema,
  centerRotor: optionalRotorValidationSchema,
  rightRotor: optionalRotorValidationSchema,
  wirings: wireableValidationSchema.check(lgte(0), llte(10)),
  uhrSetting: opt(znum().check(gte(0), lte(39))),
});

export const validateImportSchema = (input: unknown) =>
  validationSchema.safeParse(input).success;
