import type {
  EnigmaType,
  ReflectorType,
  RotorType,
  ThinReflectorType,
  ThinRotorType,
} from "../../models";

export interface RotorState<T extends RotorType | ThinRotorType> {
  type: T;
  ringPosition: number;
  windowLetter: string;
}

export type Wiring = [string, string];

export type ReflectorWiring = Wiring;

export interface ReflectorState<T extends ReflectorType | ThinReflectorType> {
  type: T;
  wirings: Array<ReflectorWiring>;
}

export type PlugBoardWiring = Wiring;
type PlugBoardState = Array<PlugBoardWiring>;

export interface EnigmaState {
  type: EnigmaType;
  reflector?: ReflectorState<ReflectorType | ThinReflectorType>;
  fourthRotor?: RotorState<ThinRotorType>;
  leftRotor?: RotorState<RotorType>;
  centerRotor?: RotorState<RotorType>;
  rightRotor?: RotorState<RotorType>;
  wirings: PlugBoardState;
  uhrSetting?: number;
  input: string;
  output: string;
}

export type RotorIdentifier = "fourth" | "left" | "center" | "right";

export interface EnigmaUpdateData {
  input: string;
  output: string;
  fourth?: Omit<RotorState<ThinRotorType>, "type">;
  left: Omit<RotorState<RotorType>, "type">;
  center: Omit<RotorState<RotorType>, "type">;
  right: Omit<RotorState<RotorType>, "type">;
}

interface EnigmaActions {
  setMachineType: (type: EnigmaType) => void;
  setReflectorType: (type: ReflectorType | ThinReflectorType) => void;
  addReflectorWiring: (wiring: ReflectorWiring) => void;
  removeReflectorWiring: (wiring: ReflectorWiring) => void;
  setRotorType: (
    rotor: RotorIdentifier,
    type: RotorState<RotorType | ThinRotorType>["type"]
  ) => void;
  setRotorRingPosition: (
    rotor: RotorIdentifier,
    ringPosition: RotorState<RotorType | ThinRotorType>["ringPosition"]
  ) => void;
  setRotorWindowLetter: (
    rotor: RotorIdentifier,
    windowLetter: RotorState<RotorType | ThinRotorType>["windowLetter"]
  ) => void;
  addPlugBoardWiring: (wiring: PlugBoardWiring) => void;
  removePlugBoardWiring: (wiring: PlugBoardWiring) => void;
  setUhrSetting: (setting: number | undefined) => void;
  update: (data: EnigmaUpdateData) => void;
  clear: () => void;
}

export type EnigmaStore = EnigmaState & EnigmaActions;
