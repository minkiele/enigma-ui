import type {
  ReflectorType,
  RotorType,
  ThinReflectorType,
  ThinRotorType,
} from "../../models";
import type { ExchangeSettings, Wiring } from "../Enigma/Enigma.models";
import { getLetter } from "enigma-minkiele/enigma/lib/utils";
import MersenneTwister from "mersenne-twister";

const types: Array<"M3" | "M4"> = ["M3", "M4"];
const reflectorsM3: Array<ReflectorType> = [
  "A",
  "B",
  "Beta",
  "C",
  "D",
  "Gamma",
];

const reflectorsM4 = (
  reflectorsM3 as Array<ThinReflectorType | ReflectorType>
).concat("Thin B", "Thin C");

const thinRotors: Array<ThinRotorType> = ["Beta", "Gamma"];

const rotors: Array<RotorType> = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
];

const letters: Array<string> = Array.from({ length: 26 }).map((_, i) =>
  getLetter(i),
);

const reflectorDWirings = letters.filter(
  (input) => !(input === "B" || input === "O"),
);

const prng = new MersenneTwister();

const pickNumber = (input: number) => Math.trunc(prng.random() * input);
const pickOne = <T>(input: Array<T>) => input[pickNumber(input.length)];
const pickLetter = () => letters[pickNumber(letters.length)];

const pairArray = (input: Array<string>, limitProp?: number): Array<Wiring> => {
  const output: Array<Wiring> = [];
  const pool = [...input];
  const limit = limitProp ?? Math.trunc(pool.length / 2);
  for (let i = 0; i < limit; i += 1) {
    const li = pickNumber(pool.length);
    const l = pool.splice(li, 1)[0];
    const ri = pickNumber(pool.length);
    const r = pool.splice(ri, 1)[0];
    output.push([l, r]);
  }
  return output;
};

const pairReflectorD = () => pairArray(reflectorDWirings);

const pairPlugboard = () => pairArray(letters, 10);

const pickRotors = () => {
  const output: Array<RotorType> = [];
  const pool = [...rotors];
  for (let i = 0; i < 3; i += 1) {
    const ri = pickNumber(pool.length);
    const r = pool.splice(ri, 1)[0];
    output.push(r);
  }
  return output;
};

export const prime = (): ExchangeSettings => {
  const type: ExchangeSettings["type"] = pickOne(types);
  const reflectorType: NonNullable<ExchangeSettings["reflector"]>["type"] =
    pickOne(type === "M3" ? reflectorsM3 : reflectorsM4);
  const reflectorWirings: NonNullable<
    ExchangeSettings["reflector"]
  >["wirings"] = reflectorType === "D" ? pairReflectorD() : [];
  const fourthRotor: ExchangeSettings["fourthRotor"] =
    reflectorType === "Thin B" || reflectorType === "Thin C"
      ? {
          type: pickOne(thinRotors),
          ringPosition: pickNumber(26),
          windowLetter: pickLetter(),
        }
      : undefined;
  const [lrt, crt, rrt] = pickRotors();
  const leftRotor: ExchangeSettings["leftRotor"] = {
    type: lrt,
    ringPosition: pickNumber(26),
    windowLetter: pickLetter(),
  };
  const centerRotor: ExchangeSettings["centerRotor"] = {
    type: crt,
    ringPosition: pickNumber(26),
    windowLetter: pickLetter(),
  };
  const rightRotor: ExchangeSettings["rightRotor"] = {
    type: rrt,
    ringPosition: pickNumber(26),
    windowLetter: pickLetter(),
  };
  const isUhr = Boolean(pickNumber(2));
  const uhrSetting: ExchangeSettings["uhrSetting"] = isUhr
    ? pickNumber(40)
    : undefined;

  const wirings: ExchangeSettings["wirings"] = pairPlugboard();

  return {
    type,
    reflector: {
      type: reflectorType,
      wirings: reflectorWirings,
    },
    fourthRotor,
    leftRotor,
    centerRotor,
    rightRotor,
    uhrSetting,
    wirings,
  };
};
