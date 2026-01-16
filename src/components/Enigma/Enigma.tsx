import type { RotorType, ThinRotorType } from "../../models";
import Interop from "../../notes/Interop.md";
import ReflectorDSetup from "../../notes/Reflector_D_Setup.md";
import UhrSetup from "../../notes/Uhr_Setup.md";
import Keyboard from "../Keyboard/Keyboard";
import type { KeyboardProps } from "../Keyboard/Keyboard.models";
import {
  DEFAULT_GROUP_BY_M3,
  DEFAULT_GROUP_BY_M4,
} from "../Keyboard/Keyboard.utils";
import LampBoard from "../LampBoard/LampBoard";
import PlugBoard from "../PlugBoard/PlugBoard";
import type { PlugBoardProps } from "../PlugBoard/PlugBoard.models";
import TypeSelector from "../TypeSelector/TypeSelector";
import type { TypeSelectorProps } from "../TypeSelector/TypeSelector.models";
import Uhr from "../Uhr/Uhr";
import type { UhrProps } from "../Uhr/Uhr.models";
import Reflector from "../WiredWheel/Reflector/Reflector";
import type { ReflectorProps } from "../WiredWheel/Reflector/Reflector.models";
import Rotor from "../WiredWheel/Rotor/Rotor";
import ThinRotor from "../WiredWheel/ThinRotor/ThinRotor";
import type { BaseRotorProps } from "../WiredWheel/components/BaseRotor/BaseRotor.models";
import type { RotorIdentifier } from "./Enigma.models";
import { useEnigma } from "./Enigma.utils";
import classNames from "classnames";
import type { FC } from "react";
import { Card, Col, Row } from "react-bootstrap";

const Enigma: FC = () => {
  const {
    type,
    setMachineType,
    isMachineValid,
    reflector,
    isReflectorValid,
    setReflectorType,
    addReflectorWiring,
    removeReflectorWiring,
    isInteropReflector,
    fourthRotor,
    isFourthRotorValid,
    leftRotor,
    isLeftRotorValid,
    centerRotor,
    isCenterRotorValid,
    rightRotor,
    isRightRotorValid,
    isFourthRotorVisible,
    setRotorType,
    setRotorRingPosition,
    setRotorWindowLetter,
    wirings,
    isPlugBoardValid,
    addPlugBoardWiring,
    removePlugBoardWiring,
    uhrSetting,
    plugUhr,
    unplugUhr,
    setUhrSetting,
    input,
    output,
    encode,
    clear,
    backspace,
    isBackspaceEnabled,
  } = useEnigma();

  const handleChangeType: TypeSelectorProps["onChangeType"] = (_, type) => {
    setMachineType(type);
  };

  const handleChangeReflector: ReflectorProps["onChangeType"] = (_, type) => {
    setReflectorType(type);
  };

  const handleAddReflectorWiring: ReflectorProps["onAddWiring"] = (
    _,
    wiring,
  ) => {
    addReflectorWiring(wiring);
  };

  const handleRemoveReflectorWiring: ReflectorProps["onRemoveWiring"] = (
    _,
    wiring,
  ) => {
    removeReflectorWiring(wiring);
  };

  const rotorColsAttrs = { xs: 12, md: isFourthRotorVisible ? 3 : 4 };

  const getUsedRotors = (exclude: RotorIdentifier) => {
    const usedRotors: Array<RotorType> = [];
    if (exclude !== "left" && leftRotor?.type) {
      usedRotors.push(leftRotor.type);
    }
    if (exclude !== "center" && centerRotor?.type) {
      usedRotors.push(centerRotor.type);
    }
    if (exclude !== "right" && rightRotor?.type) {
      usedRotors.push(rightRotor.type);
    }
    return usedRotors;
  };

  const handleChangeRotorType =
    (
      rotor: RotorIdentifier,
    ): BaseRotorProps<RotorType | ThinRotorType>["onChangeRotorType"] =>
    (_, type) => {
      setRotorType(rotor, type);
    };

  const handleChangeRotorRingPosition =
    (
      rotor: RotorIdentifier,
    ): BaseRotorProps<RotorType | ThinRotorType>["onChangeRingPosition"] =>
    (_, ringPosition) => {
      setRotorRingPosition(rotor, ringPosition);
    };

  const handleChangeWindowLetter =
    (
      rotor: RotorIdentifier,
    ): BaseRotorProps<RotorType | ThinRotorType>["onChangeWindowLetter"] =>
    (_, windowLetter) => {
      setRotorWindowLetter(rotor, windowLetter);
    };

  const handleAddPlugBoardWiring: PlugBoardProps["onAddWiring"] = (
    _,
    wiring,
  ) => {
    addPlugBoardWiring(wiring);
  };

  const handleRemovePlugBoardWiring: PlugBoardProps["onRemoveWiring"] = (
    _,
    wiring,
  ) => {
    removePlugBoardWiring(wiring);
  };

  const handlePlugUhr: UhrProps["onPlugUhr"] = () => {
    plugUhr();
  };

  const handleUnplugUhr: UhrProps["onUnplugUhr"] = () => {
    unplugUhr();
  };

  const handleSetUhrSetting: UhrProps["onSetUhrSetting"] = (_, uhrSetting) => {
    setUhrSetting(uhrSetting);
  };

  const handleInput: KeyboardProps["onInput"] = (_, input) => {
    encode(input);
  };

  return (
    <>
      <Card className="mb-3">
        <Card.Header className="bg-info-subtle">Machine type</Card.Header>
        <Card.Body>
          <TypeSelector type={type} onChangeType={handleChangeType} />
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Header
          className={classNames({
            "text-bg-success": isReflectorValid,
          })}
        >
          {type === "M3" ? "Reflector" : "Thin reflector"}
        </Card.Header>
        <Card.Body>
          <div className={classNames({ "mb-3": reflector?.type === "D" })}>
            <Reflector
              value={reflector?.type}
              all={type === "M4"}
              onChangeType={handleChangeReflector}
              wirings={reflector?.wirings}
              onAddWiring={handleAddReflectorWiring}
              onRemoveWiring={handleRemoveReflectorWiring}
            />
          </div>
          {reflector?.type === "D" && <ReflectorDSetup />}
        </Card.Body>
      </Card>
      <Row className="mb-3">
        {isFourthRotorVisible && (
          <Col {...rotorColsAttrs} className="mb-3 mb-md-0">
            <Card>
              <Card.Header
                className={classNames({
                  "text-bg-success": isFourthRotorValid,
                })}
              >
                Fourth Rotor
              </Card.Header>
              <Card.Body>
                <ThinRotor
                  value={fourthRotor?.type}
                  ringPosition={fourthRotor?.ringPosition}
                  windowLetter={fourthRotor?.windowLetter}
                  onChangeRotorType={handleChangeRotorType("fourth")}
                  onChangeRingPosition={handleChangeRotorRingPosition("fourth")}
                  onChangeWindowLetter={handleChangeWindowLetter("fourth")}
                />
              </Card.Body>
            </Card>
          </Col>
        )}
        <Col {...rotorColsAttrs} className="mb-3 mb-md-0">
          <Card>
            <Card.Header
              className={classNames({ "text-bg-success": isLeftRotorValid })}
            >
              Left Rotor
            </Card.Header>
            <Card.Body>
              <Rotor
                value={leftRotor?.type}
                ringPosition={leftRotor?.ringPosition}
                windowLetter={leftRotor?.windowLetter}
                onChangeRotorType={handleChangeRotorType("left")}
                onChangeRingPosition={handleChangeRotorRingPosition("left")}
                onChangeWindowLetter={handleChangeWindowLetter("left")}
                usedRotors={getUsedRotors("left")}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col {...rotorColsAttrs} className="mb-3 mb-md-0">
          <Card>
            <Card.Header
              className={classNames({
                "text-bg-success": isCenterRotorValid,
              })}
            >
              Center Rotor
            </Card.Header>
            <Card.Body>
              <Rotor
                value={centerRotor?.type}
                ringPosition={centerRotor?.ringPosition}
                windowLetter={centerRotor?.windowLetter}
                onChangeRotorType={handleChangeRotorType("center")}
                onChangeRingPosition={handleChangeRotorRingPosition("center")}
                onChangeWindowLetter={handleChangeWindowLetter("center")}
                usedRotors={getUsedRotors("center")}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col {...rotorColsAttrs}>
          <Card>
            <Card.Header
              className={classNames({ "text-bg-success": isRightRotorValid })}
            >
              Right Rotor
            </Card.Header>
            <Card.Body>
              <Rotor
                value={rightRotor?.type}
                ringPosition={rightRotor?.ringPosition}
                windowLetter={rightRotor?.windowLetter}
                onChangeRotorType={handleChangeRotorType("right")}
                onChangeRingPosition={handleChangeRotorRingPosition("right")}
                onChangeWindowLetter={handleChangeWindowLetter("right")}
                usedRotors={getUsedRotors("right")}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {isInteropReflector && (
        <div className="mb-3">
          <Interop />
        </div>
      )}
      <Card className="mb-3">
        <Card.Header className="bg-info-subtle">Uhr</Card.Header>
        <Card.Body>
          <Uhr
            uhrSetting={uhrSetting}
            onPlugUhr={handlePlugUhr}
            onUnplugUhr={handleUnplugUhr}
            onSetUhrSetting={handleSetUhrSetting}
          />
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Header
          className={classNames({
            "bg-info-subtle": uhrSetting == null,
            "text-bg-success": uhrSetting != null && isPlugBoardValid,
          })}
        >
          Plugboard
        </Card.Header>
        <Card.Body>
          <div className={classNames({ "mb-3": uhrSetting != null })}>
            <PlugBoard
              wirings={wirings}
              onAddWiring={handleAddPlugBoardWiring}
              onRemoveWiring={handleRemovePlugBoardWiring}
              lifo={uhrSetting != null}
            />
          </div>
          {uhrSetting != null && <UhrSetup />}
        </Card.Body>
      </Card>
      <Card>
        <Card.Header className="bg-info-subtle">Keyboard</Card.Header>
        <Card.Body>
          <Keyboard
            input={input}
            output={output}
            groupBy={type === "M3" ? DEFAULT_GROUP_BY_M3 : DEFAULT_GROUP_BY_M4}
            disabled={!isMachineValid}
            backspaceEnabled={isBackspaceEnabled}
            onInput={handleInput}
            onBackspace={backspace}
            onReset={clear}
          />
        </Card.Body>
      </Card>
      <Card>
        <Card.Header className="bg-info-subtle">Lampboard</Card.Header>
        <Card.Body>
          <LampBoard />
        </Card.Body>
      </Card>
    </>
  );
};

export default Enigma;
