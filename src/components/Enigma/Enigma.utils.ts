import type {
  ReflectorType,
  RotorType,
  ThinReflectorType,
  ThinRotorType,
} from "../../models";
import type {
  EnigmaState,
  EnigmaStore,
  RotorIdentifier,
  RotorState,
  Wiring,
} from "./Enigma.models";
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
  Uhr,
} from "enigma-minkiele";
import Reflector from "enigma-minkiele/enigma/Component/WiredWheel/Reflector/Reflector";
import type Rotor from "enigma-minkiele/enigma/Component/WiredWheel/Rotor/Rotor";
import { useCallback, useDebugValue, useEffect, useRef, useState } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const initialState: EnigmaState = {
  type: "M3",
  reflector: undefined,
  fourthRotor: undefined,
  leftRotor: undefined,
  centerRotor: undefined,
  rightRotor: undefined,
  wirings: [],
  uhrSetting: undefined,
  input: "",
  output: "",
  history: [],
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

export const thinReflectors: Array<ReflectorType | ThinReflectorType> = [
  "Thin B",
  "Thin C",
];

const matchRemovabileWirings = (wiring: Wiring) => (toRemove: Wiring) =>
  !(
    (wiring[0] === toRemove[0] && wiring[1] === toRemove[1]) ||
    (wiring[0] === toRemove[1] && wiring[1] === toRemove[0])
  );

const restoreStoreWindowLetters = (state: EnigmaState, index: number) => {
  if (state.history.length > 0 && index >= 0 && index < state.history.length) {
    const entry = state.history[index];
    if (entry) {
      if (state.fourthRotor && entry.fourth) {
        state.fourthRotor.windowLetter = entry.fourth;
      }
      if (state.leftRotor && entry.left) {
        state.leftRotor.windowLetter = entry.left;
      }
      if (state.centerRotor && entry.center) {
        state.centerRotor.windowLetter = entry.center;
      }
      if (state.rightRotor && entry.right) {
        state.rightRotor.windowLetter = entry.right;
      }
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
        // Changing rotor resets history as it would be inconsistent with the actual state
        state.history = [];
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
        state.history.push({
          fourth: state.fourthRotor?.windowLetter,
          left: state.leftRotor?.windowLetter,
          center: state.centerRotor?.windowLetter,
          right: state.rightRotor?.windowLetter,
        });
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
        state.wirings = state.wirings.filter(matchRemovabileWirings(wiring));
      });
    },
    plugUhr: () => {
      set((state) => {
        state.uhrSetting = 0;
      });
    },
    unplugUhr: () => {
      set((state) => {
        state.uhrSetting = undefined;
      });
    },
    setUhrSetting: (setting) => {
      set((state) => {
        state.uhrSetting = setting;
      });
    },
    setMachineType: (type) => {
      set((state) => ({ ...state, ...initialState, type }));
    },
    setReflectorType: (type) => {
      set((state) => {
        state.reflector = { type, wirings: [] };
        if (state.type === "M4" && !thinReflectors.includes(type)) {
          state.fourthRotor = undefined;
        }
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
            matchRemovabileWirings(wiring),
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
          state.history = [];
        }
      });
    },
    clear: () => {
      set((state) => {
        state.input = "";
        state.output = "";
        if (state.history.length > 0) {
          restoreStoreWindowLetters(state, 0);
          state.history = [];
        }
      });
    },
    backspace: () => {
      set((state) => {
        if (state.history.length > 0) {
          state.input = state.input.slice(0, -1);
          state.output = state.output.slice(0, -1);
          restoreStoreWindowLetters(state, state.history.length - 1);
          state.history.pop();
        }
      });
    },
    importSettings: (settings) => {
      set(() => ({
        ...initialState,
        ...settings,
      }));
    },
  })),
);

export const useEnigma = () => {
  const {
    setMachineType: storeSetMachineType,
    addPlugBoardWiring: storeAddPlugBoardWiring,
    removePlugBoardWiring: storeRemovePlugBoardWiring,
    setUhrSetting: storeSetUhrSetting,
    setReflectorType: storeSetReflectorType,
    addReflectorWiring: storeAddReflectorWiring,
    removeReflectorWiring: storeRemoveReflectorWiring,
    setRotorRingPosition: storeSetRotorRingPosition,
    setRotorType: storeSetRotorType,
    setRotorWindowLetter: storeSetRotorWindowLetter,
    update,
    type,
    wirings,
    history,
    backspace: storeBackspace,
    clear: storeClear,
    importSettings: storeImportSettings,
    ...state
  } = useEnigmaStore();
  const machineRef = useRef<Enigma | EnigmaM4>(new Enigma());
  const uhrRef = useRef<Uhr | undefined>(undefined);

  const refSetMachineType = useCallback<typeof storeSetMachineType>((type) => {
    uhrRef.current = undefined;
    if (type === "M3") {
      machineRef.current = new Enigma();
    } else {
      machineRef.current = new EnigmaM4();
    }
  }, []);
  const setMachineType = useCallback<typeof storeSetMachineType>(
    (type) => {
      refSetMachineType(type);
      storeSetMachineType(type);
    },
    [refSetMachineType, storeSetMachineType],
  );

  const refAddPlugBoardWiring = useCallback((index: number, wiring: Wiring) => {
    if (uhrRef.current instanceof Uhr) {
      machineRef.current
        .getPlugBoard()
        .plugWire(uhrRef.current.prepareUhrWire(index, ...wiring));
    } else {
      machineRef.current.getPlugBoard().plugWire(...wiring);
    }
  }, []);

  const addPlugBoardWiring = useCallback<typeof storeAddPlugBoardWiring>(
    (wiring) => {
      refAddPlugBoardWiring(wirings.length + 1, wiring);
      storeAddPlugBoardWiring(wiring);
    },
    [wirings, refAddPlugBoardWiring, storeAddPlugBoardWiring],
  );

  const removePlugBoardWiring = useCallback<typeof storeAddPlugBoardWiring>(
    (wiring) => {
      if (uhrRef.current instanceof Uhr) {
        const index = wirings.findIndex(matchRemovabileWirings(wiring)) + 1;
        if (index > 0) {
          machineRef.current
            .getPlugBoard()
            .unplugWire(uhrRef.current.getUhrWire(index));
        }
      } else {
        machineRef.current.getPlugBoard().unplugWire(...wiring);
      }
      storeRemovePlugBoardWiring(wiring);
    },
    [wirings, storeRemovePlugBoardWiring],
  );

  const refPlugUhr = useCallback((wirings: Array<Wiring>) => {
    uhrRef.current = new Uhr();
    uhrRef.current.prepareUhrWires(wirings);
    machineRef.current.getPlugBoard().unplugAllWires();
    machineRef.current.getPlugBoard().plugWires(uhrRef.current.getUhrWires());
  }, []);

  const plugUhr = useCallback(() => {
    refPlugUhr(wirings);
    storeSetUhrSetting(0);
  }, [wirings, refPlugUhr, storeSetUhrSetting]);

  const unplugUhr = useCallback(() => {
    machineRef.current.getPlugBoard().unplugAllWires();
    machineRef.current.getPlugBoard().plugWires(wirings);
    uhrRef.current = undefined;
    storeSetUhrSetting(undefined);
  }, [wirings, storeSetUhrSetting]);

  const refSetUhrSetting = useCallback((uhrSetting: number) => {
    if (uhrRef.current instanceof Uhr) {
      uhrRef.current.setUhrSetting(uhrSetting);
      return true;
    }
    return false;
  }, []);

  const setUhrSetting = useCallback(
    (uhrSetting: number) => {
      if (refSetUhrSetting(uhrSetting)) {
        storeSetUhrSetting(uhrSetting);
      }
    },
    [refSetUhrSetting, storeSetUhrSetting],
  );

  const isPlugBoardValid = state.uhrSetting == null || wirings.length === 10;

  const refSetReflectorType = useCallback<typeof storeSetReflectorType>(
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
      machineRef.current.setReflector(reflector);
      if (
        machineRef.current instanceof EnigmaM4 &&
        !thinReflectors.includes(type)
      ) {
        machineRef.current.unsetRotor(EnigmaM4.FOURTH_ROTOR);
      }
    },
    [],
  );

  const setReflectorType = useCallback<typeof storeSetReflectorType>(
    (type) => {
      refSetReflectorType(type);
      storeSetReflectorType(type);
    },
    [refSetReflectorType, storeSetReflectorType],
  );

  const refAddReflectorWiring = useCallback((wiring: Wiring) => {
    const reflector = machineRef.current.getReflector();
    if (reflector instanceof ReflectorD) {
      reflector.plugWireInAlliedNotation(...wiring);
      return true;
    }
    return false;
  }, []);

  const addReflectorWiring = useCallback<typeof storeAddReflectorWiring>(
    (wiring) => {
      if (refAddReflectorWiring(wiring)) {
        storeAddReflectorWiring(wiring);
      }
    },
    [refAddReflectorWiring, storeAddReflectorWiring],
  );

  const removeReflectorWiring = useCallback<typeof storeRemoveReflectorWiring>(
    (wiring) => {
      const reflector = machineRef.current.getReflector();
      if (reflector instanceof ReflectorD) {
        reflector.unplugWireInAlliedNotation(...wiring);
        storeRemoveReflectorWiring(wiring);
      }
    },
    [storeRemoveReflectorWiring],
  );

  const refSetRotorType = useCallback<typeof storeSetRotorType>(
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
    },
    [],
  );
  const setRotorType = useCallback<typeof storeSetRotorType>(
    (rotor, type) => {
      refSetRotorType(rotor, type);
      storeSetRotorType(rotor, type);
    },
    [refSetRotorType, storeSetRotorType],
  );
  const refSetRotorRingPosition = useCallback(
    (rotor: RotorIdentifier, ringPosition: number) => {
      const machineRotor = machineRef.current.getRotor(getRotorName(rotor));
      if (machineRotor != null) {
        machineRotor.setRingPosition(ringPosition);
        return true;
      }
      return false;
    },
    [],
  );
  const setRotorRingPosition = useCallback<typeof storeSetRotorRingPosition>(
    (rotor, ringPosition) => {
      if (refSetRotorRingPosition(rotor, ringPosition)) {
        storeSetRotorRingPosition(rotor, ringPosition);
      }
    },
    [refSetRotorRingPosition, storeSetRotorRingPosition],
  );
  const refSetRotorWindowLetter = useCallback<typeof storeSetRotorWindowLetter>(
    (rotor, windowLetter) => {
      machineRef.current.setRotorWindowLetter(
        windowLetter,
        getRotorName(rotor),
      );
    },
    [],
  );
  const setRotorWindowLetter = useCallback<typeof storeSetRotorWindowLetter>(
    (rotor, windowLetter) => {
      refSetRotorWindowLetter(rotor, windowLetter);
      storeSetRotorWindowLetter(rotor, windowLetter);
    },
    [refSetRotorWindowLetter, storeSetRotorWindowLetter],
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
                ringPosition:
                  machineRef.current.getRotor(EnigmaM4.FOURTH_ROTOR)
                    ?.ringPosition ?? 0,
                windowLetter: machineRef.current.getRotorWindowLetter(
                  EnigmaM4.FOURTH_ROTOR,
                ),
              }
            : undefined,
        left: {
          ringPosition:
            machineRef.current.getRotor(Enigma.LEFT_ROTOR)?.ringPosition ?? 0,
          windowLetter: machineRef.current.getRotorWindowLetter(
            Enigma.LEFT_ROTOR,
          ),
        },
        center: {
          ringPosition:
            machineRef.current.getRotor(Enigma.CENTER_ROTOR)?.ringPosition ?? 0,
          windowLetter: machineRef.current.getRotorWindowLetter(
            Enigma.CENTER_ROTOR,
          ),
        },
        right: {
          ringPosition:
            machineRef.current.getRotor(Enigma.RIGHT_ROTOR)?.ringPosition ?? 0,
          windowLetter: machineRef.current.getRotorWindowLetter(
            Enigma.RIGHT_ROTOR,
          ),
        },
      });
    },
    [update, type],
  );

  const restoreWindowLetters = useCallback(
    (index: number) => {
      if (history.length > 0 && index >= 0 && index < history.length) {
        const toRestore = history[index];
        if (type === "M4" && toRestore.fourth != null) {
          machineRef.current.setRotorWindowLetter(
            toRestore.fourth,
            EnigmaM4.FOURTH_ROTOR,
          );
        }
        if (toRestore.left != null) {
          machineRef.current.setRotorWindowLetter(
            toRestore.left,
            Enigma.LEFT_ROTOR,
          );
        }
        if (toRestore.center != null) {
          machineRef.current.setRotorWindowLetter(
            toRestore.center,
            Enigma.CENTER_ROTOR,
          );
        }
        if (toRestore.right != null) {
          machineRef.current.setRotorWindowLetter(
            toRestore.right,
            Enigma.RIGHT_ROTOR,
          );
        }
      }
    },
    [type, history],
  );

  const backspace = useCallback(() => {
    if (history.length > 0) {
      restoreWindowLetters(history.length - 1);
      storeBackspace();
    }
  }, [history, restoreWindowLetters, storeBackspace]);

  const clear = useCallback(() => {
    if (history.length > 0) {
      restoreWindowLetters(0);
    }
    storeClear();
  }, [history, restoreWindowLetters, storeClear]);

  const importSettings = useCallback<typeof storeImportSettings>(
    (settings) => {
      refSetMachineType(settings.type);
      if (settings.reflector) {
        refSetReflectorType(settings.reflector.type);
        if (settings.reflector.type === "D") {
          settings.reflector.wirings.forEach(refAddReflectorWiring);
        }
      }
      const maybeSetupRotor = (
        rotor: RotorIdentifier,
        settings: RotorState<RotorType | ThinRotorType> | undefined,
      ) => {
        if (settings) {
          refSetRotorType(rotor, settings.type);
          refSetRotorRingPosition(rotor, settings.ringPosition);
          refSetRotorWindowLetter(rotor, settings.windowLetter);
        }
      };
      maybeSetupRotor("fourth", settings.fourthRotor);
      maybeSetupRotor("left", settings.leftRotor);
      maybeSetupRotor("center", settings.centerRotor);
      maybeSetupRotor("right", settings.rightRotor);
      if (settings.uhrSetting != null) {
        refSetUhrSetting(settings.uhrSetting);
      }
      settings.wirings.forEach((wiring, index) =>
        refAddPlugBoardWiring(index, wiring),
      );
      storeImportSettings(settings);
    },
    [
      refSetMachineType,
      refSetReflectorType,
      refAddReflectorWiring,
      refSetRotorType,
      refSetRotorRingPosition,
      refSetRotorWindowLetter,
      refSetUhrSetting,
      refAddPlugBoardWiring,
      storeImportSettings,
    ],
  );

  const isFourthRotorValid = Boolean(state.fourthRotor?.type);
  const isLeftRotorValid = Boolean(state.leftRotor?.type);
  const isCenterRotorValid = Boolean(state.centerRotor?.type);
  const isRightRotorValid = Boolean(state.rightRotor?.type);
  const isFourthRotorVisible =
    type === "M4" &&
    (state.reflector?.type == null ||
      thinReflectors.includes(state.reflector.type));

  const isReflectorValid = Boolean(
    state.reflector?.type &&
    (state.reflector.type !== "D" || state.reflector.wirings.length === 12),
  );

  const isMachineValid =
    isReflectorValid &&
    (type === "M3" || isFourthRotorValid || !isFourthRotorVisible) &&
    isLeftRotorValid &&
    isCenterRotorValid &&
    isRightRotorValid &&
    isPlugBoardValid;

  const isInteropReflector =
    type === "M4" &&
    state.fourthRotor?.windowLetter === "A" &&
    state.fourthRotor.ringPosition === 0 &&
    ((state.reflector?.type === "Thin B" &&
      state.fourthRotor.type === "Beta") ||
      (state.reflector?.type === "Thin C" &&
        state.fourthRotor.type === "Gamma"));

  const isBackspaceEnabled = history.length > 0;

  const hookReturnValue = {
    ...state,
    type,
    setMachineType,
    isMachineValid,
    wirings,
    isPlugBoardValid,
    addPlugBoardWiring,
    removePlugBoardWiring,
    plugUhr,
    unplugUhr,
    setUhrSetting,
    isReflectorValid,
    setReflectorType,
    addReflectorWiring,
    removeReflectorWiring,
    isInteropReflector,
    isFourthRotorValid,
    isLeftRotorValid,
    isCenterRotorValid,
    isRightRotorValid,
    isFourthRotorVisible,
    setRotorType,
    setRotorRingPosition,
    setRotorWindowLetter,
    encode,
    backspace,
    isBackspaceEnabled,
    clear,
    importSettings,
  };

  useDebugValue(hookReturnValue);

  return hookReturnValue;
};

export const useImportScroll = () => {
  const [lastImport, setLastImport] = useState<Date>();
  const keyboardRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (lastImport != null) {
      keyboardRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [lastImport]);
  const triggerScroll = useCallback(() => setLastImport(new Date()), []);
  return { triggerScroll, keyboardRef };
};
