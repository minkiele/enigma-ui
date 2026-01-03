import { create } from "zustand";
import type {
  EnigmaState,
  EnigmaStore,
  RotorIdentifier,
} from "./Enigma.models";
import { immer } from "zustand/middleware/immer";
import { useCallback, useRef } from "react";
import {
  Enigma,
  EnigmaM4,
  ReflectorA,
  ReflectorB,
  ReflectorBeta,
  ReflectorC,
  ReflectorD,
  ReflectorGamma,
  RotorI,
  RotorII,
  RotorIII,
  RotorIV,
  RotorV,
  RotorVI,
  RotorVII,
  RotorVIII,
  ThinReflectorB,
  ThinReflectorC,
  ThinRotorBeta,
  ThinRotorGamma,
} from "enigma-minkiele";
import Reflector from "enigma-minkiele/enigma/Component/WiredWheel/Reflector/Reflector";
import type Rotor from "enigma-minkiele/enigma/Component/WiredWheel/Rotor/Rotor";
import type { RotorType, ThinRotorType } from "../../models";

const initialState: EnigmaState = {
  type: "M3",
  reflector: undefined,
  fourthRotor: undefined,
  leftRotor: undefined,
  centerRotor: undefined,
  rightRotor: undefined,
  wirings: [],
  input: "",
  output: "",
};

const getRotorName = (rotor: RotorIdentifier) => {
  switch (rotor) {
    case "fourth": {
      return EnigmaM4.FOURTH_ROTOR;
    }
    case "left": {
      return Enigma.LEFT_ROTOR;
    }
    case "center": {
      return Enigma.CENTER_ROTOR;
    }
    case "right": {
      return Enigma.RIGHT_ROTOR;
    }
  }
};

const useEnigmaStore = create<EnigmaStore>()(
  immer((set) => ({
    ...initialState,
    setRotorType: (rotor, type) => {
      set((state) => {
        if (rotor === "fourth") {
          state.fourthRotor = {
            type: type as ThinRotorType,
            ringPosition: 0,
            windowLetter: "A",
          };
        } else {
          state[`${rotor}Rotor`] = {
            type: type as RotorType,
            ringPosition: 0,
            windowLetter: "A",
          };
        }
      });
    },
    addPlugBoardWiring: (wiring) => {
      set((state) => {
        state.wirings.push(wiring);
      });
    },
    update: ({ input, output, fourth, left, center, right }) => {
      set((state) => {
        state.input += input;
        state.output += output;
        if (state.fourthRotor && fourth) {
          state.fourthRotor = { ...state.fourthRotor, ...fourth };
        }
        if (state.leftRotor && fourth) {
          state.leftRotor = { ...state.leftRotor, ...left };
        }
        if (state.centerRotor && center) {
          state.centerRotor = { ...state.centerRotor, ...center };
        }
        if (state.rightRotor && right) {
          state.rightRotor = { ...state.rightRotor, ...right };
        }
      });
    },
    removePlugBoardWiring: (wiring) => {
      set((state) => {
        state.wirings = state.wirings.filter(
          (toRemove) =>
            !(
              (wiring[0] === toRemove[0] && wiring[1] === toRemove[1]) ||
              (wiring[0] === toRemove[1] && wiring[1] === toRemove[0])
            )
        );
      });
    },
    setMachineType: (type) => {
      set((state) => ({ ...state, ...initialState, type }));
    },
    setReflectorType: (type) => {
      set((state) => {
        state.reflector = { type, wirings: [] };
      });
    },
    addReflectorWiring: (wiring) => {
      set((state) => {
        if (state.reflector) {
          state.reflector.wirings.push(wiring);
        }
      });
    },
    removeReflectorWiring: (wiring) => {
      set((state) => {
        if (state.reflector) {
          state.reflector.wirings = state.reflector.wirings.filter(
            (toRemove) =>
              !(
                (wiring[0] === toRemove[0] && wiring[1] === toRemove[1]) ||
                (wiring[0] === toRemove[1] && wiring[1] === toRemove[0])
              )
          );
        }
      });
    },
    setRotorRingPosition: (rotor, ringPosition) => {
      set((state) => {
        const key: `${RotorIdentifier}Rotor` = `${rotor}Rotor`;
        if (state[key] != null) {
          state[key].ringPosition = ringPosition;
        }
      });
    },
    setRotorWindowLetter: (rotor, windowLetter) => {
      set((state) => {
        const key: `${RotorIdentifier}Rotor` = `${rotor}Rotor`;
        if (state[key] != null) {
          state[key].windowLetter = windowLetter;
        }
      });
    },
    clear: () => {
      set((state) => {
        state.input = "";
        state.output = "";
      });
    },
  }))
);

export const useEnigma = () => {
  const {
    setMachineType: storeSetMachineType,
    addPlugBoardWiring: storeAddPlugBoardWiring,
    removePlugBoardWiring: storeRemovePlugBoardWiring,
    setReflectorType: storeSetReflectorType,
    addReflectorWiring: storeAddReflectorWiring,
    removeReflectorWiring: storeRemoveReflectorWiring,
    setRotorRingPosition: storeSetRotorRingPosition,
    setRotorType: storeSetRotorType,
    setRotorWindowLetter: storeSetRotorWindowLetter,
    update,
    type,
    ...state
  } = useEnigmaStore();
  const machineRef = useRef<Enigma | EnigmaM4>(new Enigma());
  const reflectorRef = useRef<Reflector | undefined>(undefined);
  const setMachineType = useCallback<typeof storeSetMachineType>(
    (type) => {
      reflectorRef.current = undefined;
      if (type === "M3") {
        machineRef.current = new Enigma();
      } else {
        machineRef.current = new EnigmaM4();
      }
      storeSetMachineType(type);
    },
    [storeSetMachineType]
  );
  const addPlugBoardWiring = useCallback<typeof storeAddPlugBoardWiring>(
    (wiring) => {
      machineRef.current.getPlugBoard().plugWire(...wiring);
      storeAddPlugBoardWiring(wiring);
    },
    [storeAddPlugBoardWiring]
  );

  const removePlugBoardWiring = useCallback<typeof storeAddPlugBoardWiring>(
    (wiring) => {
      machineRef.current.getPlugBoard().unplugWire(...wiring);
      storeRemovePlugBoardWiring(wiring);
    },
    [storeRemovePlugBoardWiring]
  );

  const setReflectorType = useCallback<typeof storeSetReflectorType>(
    (type) => {
      let reflector: Reflector;
      switch (type) {
        case "A": {
          reflector = new ReflectorA();
          break;
        }
        case "B": {
          reflector = new ReflectorB();
          break;
        }
        case "C": {
          reflector = new ReflectorC();
          break;
        }
        case "Beta": {
          reflector = new ReflectorBeta();
          break;
        }
        case "Gamma": {
          reflector = new ReflectorGamma();
          break;
        }
        case "Thin B": {
          reflector = new ThinReflectorB();
          break;
        }
        case "Thin C": {
          reflector = new ThinReflectorC();
          break;
        }
        case "D": {
          reflector = new ReflectorD();
        }
      }
      reflectorRef.current = reflector;
      machineRef.current.setReflector(reflector);
      storeSetReflectorType(type);
    },
    [storeSetReflectorType]
  );

  const addReflectorWiring = useCallback<typeof storeAddReflectorWiring>(
    (wiring) => {
      if (reflectorRef.current instanceof ReflectorD) {
        reflectorRef.current.plugWireInAlliedNotation(...wiring);
        storeAddReflectorWiring(wiring);
      }
    },
    [storeAddReflectorWiring]
  );

  const removeReflectorWiring = useCallback<typeof storeRemoveReflectorWiring>(
    (wiring) => {
      if (reflectorRef.current instanceof ReflectorD) {
        reflectorRef.current.unplugWireInAlliedNotation(...wiring);
        storeRemoveReflectorWiring(wiring);
      }
    },
    [storeRemoveReflectorWiring]
  );

  const setRotorType = useCallback<typeof storeSetRotorType>(
    (rotor, type) => {
      let rotorInstance: Rotor;
      switch (type) {
        case "I": {
          rotorInstance = new RotorI();
          break;
        }
        case "II": {
          rotorInstance = new RotorII();
          break;
        }
        case "III": {
          rotorInstance = new RotorIII();
          break;
        }
        case "IV": {
          rotorInstance = new RotorIV();
          break;
        }
        case "V": {
          rotorInstance = new RotorV();
          break;
        }
        case "VI": {
          rotorInstance = new RotorVI();
          break;
        }
        case "VII": {
          rotorInstance = new RotorVII();
          break;
        }
        case "VIII": {
          rotorInstance = new RotorVIII();
          break;
        }
        case "Beta": {
          rotorInstance = new ThinRotorBeta();
          break;
        }
        case "Gamma": {
          rotorInstance = new ThinRotorGamma();
          break;
        }
      }

      machineRef.current.setRotor(rotorInstance, getRotorName(rotor));
      storeSetRotorType(rotor, type);
    },
    [storeSetRotorType]
  );
  const setRotorRingPosition = useCallback<typeof storeSetRotorRingPosition>(
    (rotor, ringPosition) => {
      machineRef.current
        .getRotor(getRotorName(rotor))
        .setRingPosition(ringPosition);
      storeSetRotorRingPosition(rotor, ringPosition);
    },
    [storeSetRotorRingPosition]
  );
  const setRotorWindowLetter = useCallback<typeof storeSetRotorWindowLetter>(
    (rotor, windowLetter) => {
      machineRef.current.setRotorWindowLetter(
        windowLetter,
        getRotorName(rotor)
      );
      storeSetRotorWindowLetter(rotor, windowLetter);
    },
    [storeSetRotorWindowLetter]
  );
  const encode = useCallback(
    (input: string) => {
      const output = machineRef.current.encode(input);
      update({
        input,
        output,
        fourth:
          type === "M4"
            ? {
                ringPosition: machineRef.current.getRotor(EnigmaM4.FOURTH_ROTOR)
                  .ringPosition,
                windowLetter: machineRef.current.getRotorWindowLetter(
                  EnigmaM4.FOURTH_ROTOR
                ),
              }
            : undefined,
        left: {
          ringPosition: machineRef.current.getRotor(Enigma.LEFT_ROTOR)
            .ringPosition,
          windowLetter: machineRef.current.getRotorWindowLetter(
            Enigma.LEFT_ROTOR
          ),
        },
        center: {
          ringPosition: machineRef.current.getRotor(Enigma.CENTER_ROTOR)
            .ringPosition,
          windowLetter: machineRef.current.getRotorWindowLetter(
            Enigma.CENTER_ROTOR
          ),
        },
        right: {
          ringPosition: machineRef.current.getRotor(Enigma.RIGHT_ROTOR)
            .ringPosition,
          windowLetter: machineRef.current.getRotorWindowLetter(
            Enigma.RIGHT_ROTOR
          ),
        },
      });
    },
    [update, type]
  );

  const isFourthRotorValid = Boolean(state.fourthRotor?.type);
  const isLeftRotorValid = Boolean(state.leftRotor?.type);
  const isCenterRotorValid = Boolean(state.centerRotor?.type);
  const isRightRotorValid = Boolean(state.rightRotor?.type);

  const isReflectorValid = Boolean(
    state.reflector?.type &&
      (state.reflector.type !== "D" || state.reflector.wirings.length === 12)
  );

  return {
    ...state,
    type,
    setMachineType,
    addPlugBoardWiring,
    removePlugBoardWiring,
    isReflectorValid,
    setReflectorType,
    addReflectorWiring,
    removeReflectorWiring,
    isFourthRotorValid,
    isLeftRotorValid,
    isCenterRotorValid,
    isRightRotorValid,
    setRotorType,
    setRotorRingPosition,
    setRotorWindowLetter,
    encode,
  };
};
