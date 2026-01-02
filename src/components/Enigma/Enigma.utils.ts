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
import type Reflector from "enigma-minkiele/enigma/Component/WiredWheel/Reflector/Reflector";
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
        state.reflector = type;
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
  }))
);

export const useEnigma = () => {
  const {
    setMachineType: storeSetMachineType,
    addPlugBoardWiring: storeAddPlugBoardWiring,
    removePlugBoardWiring: storeRemovePlugBoardWiring,
    setReflectorType: storeSetReflectorType,
    setRotorRingPosition: storeSetRotorRingPosition,
    setRotorType: storeSetRotorType,
    setRotorWindowLetter: storeSetRotorWindowLetter,
    update,
    type,
    ...state
  } = useEnigmaStore();
  const machine = useRef<Enigma | EnigmaM4>(new Enigma());
  const setMachineType = useCallback<typeof storeSetMachineType>(
    (type) => {
      if (type === "M3") {
        machine.current = new Enigma();
      } else {
        machine.current = new EnigmaM4();
      }
      storeSetMachineType(type);
    },
    [storeSetMachineType]
  );
  const addPlugBoardWiring = useCallback<typeof storeAddPlugBoardWiring>(
    (wiring) => {
      machine.current.getPlugBoard().plugWire(...wiring);
      storeAddPlugBoardWiring(wiring);
    },
    [storeAddPlugBoardWiring]
  );

  const removePlugBoardWiring = useCallback<typeof storeAddPlugBoardWiring>(
    (wiring) => {
      machine.current.getPlugBoard().unplugWire(...wiring);
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
      }
      machine.current.setReflector(reflector);
      storeSetReflectorType(type);
    },
    [storeSetReflectorType]
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

      machine.current.setRotor(rotorInstance, getRotorName(rotor));
      storeSetRotorType(rotor, type);
    },
    [storeSetRotorType]
  );
  const setRotorRingPosition = useCallback<typeof storeSetRotorRingPosition>(
    (rotor, ringPosition) => {
      machine.current
        .getRotor(getRotorName(rotor))
        .setRingPosition(ringPosition);
      storeSetRotorRingPosition(rotor, ringPosition);
    },
    [storeSetRotorRingPosition]
  );
  const setRotorWindowLetter = useCallback<typeof storeSetRotorWindowLetter>(
    (rotor, windowLetter) => {
      machine.current.setRotorWindowLetter(windowLetter, getRotorName(rotor));
      storeSetRotorWindowLetter(rotor, windowLetter);
    },
    [storeSetRotorWindowLetter]
  );
  const encode = useCallback(
    (input: string) => {
      const output = machine.current.encode(input);
      update({
        input,
        output,
        fourth:
          type === "M4"
            ? {
                ringPosition: machine.current.getRotor(EnigmaM4.FOURTH_ROTOR)
                  .ringPosition,
                windowLetter: machine.current.getRotorWindowLetter(
                  EnigmaM4.FOURTH_ROTOR
                ),
              }
            : undefined,
        left: {
          ringPosition: machine.current.getRotor(Enigma.LEFT_ROTOR)
            .ringPosition,
          windowLetter: machine.current.getRotorWindowLetter(Enigma.LEFT_ROTOR),
        },
        center: {
          ringPosition: machine.current.getRotor(Enigma.CENTER_ROTOR)
            .ringPosition,
          windowLetter: machine.current.getRotorWindowLetter(
            Enigma.CENTER_ROTOR
          ),
        },
        right: {
          ringPosition: machine.current.getRotor(Enigma.RIGHT_ROTOR)
            .ringPosition,
          windowLetter: machine.current.getRotorWindowLetter(
            Enigma.RIGHT_ROTOR
          ),
        },
      });
    },
    [update, type]
  );
  return {
    ...state,
    type,
    setMachineType,
    addPlugBoardWiring,
    removePlugBoardWiring,
    setReflectorType,
    setRotorType,
    setRotorRingPosition,
    setRotorWindowLetter,
    encode,
  };
};
