import type { FC } from "react";
import type {
  ReflectorType,
  RotorType,
  ThinReflectorType,
  ThinRotorType,
} from "../../models";
import Reflector from "../WiredWheel/Reflector/Reflector";
import ThinReflector from "../WiredWheel/ThinReflector/ThinReflector";
import { Card, Col, Row } from "react-bootstrap";
import TypeSelector from "../TypeSelector/TypeSelector";
import Rotor from "../WiredWheel/Rotor/Rotor";
import { useEnigma } from "./Enigma.utils";
import type { TypeSelectorProps } from "../TypeSelector/TypeSelector.models";
import type { BaseReflectorProps } from "../WiredWheel/components/BaseReflector/BaseReflector.models";
import ThinRotor from "../WiredWheel/ThinRotor/ThinRotor";
import type { RotorIdentifier, RotorState } from "./Enigma.models";
import PlugBoard from "../Plugboard/PlugBoard";
import type { PlugBoardProps } from "../Plugboard/PlugBoard.models";
import type { BaseRotorProps } from "../WiredWheel/components/BaseRotor/BaseRotor.models";
import Keyboard from "../Keyboard/Keyboard";
import type { KeyboardProps } from "../Keyboard/Keyboard.models";

const Enigma: FC = () => {
  const {
    type,
    setMachineType,
    reflector,
    setReflectorType,
    fourthRotor,
    leftRotor,
    centerRotor,
    rightRotor,
    setRotorType,
    setRotorRingPosition,
    setRotorWindowLetter,
    wirings,
    addPlugBoardWiring,
    removePlugBoardWiring,
    output,
    encode,
  } = useEnigma();

  const handleChangeType: TypeSelectorProps["onChangeType"] = (_, type) => {
    setMachineType(type);
  };

  const handleChangeReflector: BaseReflectorProps["onChangeType"] = (
    _,
    type
  ) => {
    setReflectorType(type);
  };

  const rotorColsAttrs = { xs: 12, md: type === "M3" ? 4 : 3 };

  const reflectorSuccessCols = {
    bg: reflector != null ? "success" : undefined,
    text: reflector != null ? "success" : undefined,
  };

  const getRotorSuccessCol = (
    rotor: RotorState<RotorType | ThinRotorType> | undefined
  ) => {
    const isSuccess =
      rotor?.type != null &&
      rotor.ringPosition != null &&
      rotor.windowLetter != null;
    return {
      bg: isSuccess != null ? "success" : undefined,
      text: isSuccess != null ? "success" : undefined,
    };
  };

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
      rotor: RotorIdentifier
    ): BaseRotorProps<RotorType | ThinRotorType>["onChangeRotorType"] =>
    (_, type) => {
      setRotorType(rotor, type);
    };

  const handleChangeRotorRingPosition =
    (
      rotor: RotorIdentifier
    ): BaseRotorProps<RotorType | ThinRotorType>["onChangeRingPosition"] =>
    (_, ringPosition) => {
      setRotorRingPosition(rotor, ringPosition);
    };

  const handleChangeWindowLetter =
    (
      rotor: RotorIdentifier
    ): BaseRotorProps<RotorType | ThinRotorType>["onChangeWindowLetter"] =>
    (_, windowLetter) => {
      setRotorWindowLetter(rotor, windowLetter);
    };

  const handleAddPlugBoardWiring: PlugBoardProps["onAddWiring"] = (
    _,
    wiring
  ) => {
    addPlugBoardWiring(wiring);
  };

  const handleRemovePlugBoardWiring: PlugBoardProps["onRemoveWiring"] = (
    _,
    wiring
  ) => {
    removePlugBoardWiring(wiring);
  };

  const handleInput: KeyboardProps["onInput"] = (_, input) => {
    encode(input);
  };

  return (
    <div className="enigmaUI">
      <Card bg="info" text="info">
        <Card.Body>
          <Card.Title>Machine type</Card.Title>
          <TypeSelector type={type} onChangeType={handleChangeType} />
        </Card.Body>
      </Card>
      <div className="enigmaConfiguration">
        <Card {...reflectorSuccessCols}>
          <Card.Body>
            <Card.Title>
              {type === "M3" ? "Reflector" : "Thin reflector"}
            </Card.Title>
            {type === "M3" ? (
              <Reflector
                type={reflector as ReflectorType}
                onChangeType={handleChangeReflector}
              />
            ) : (
              <ThinReflector
                type={reflector as ThinReflectorType}
                onChangeType={handleChangeReflector}
              />
            )}
          </Card.Body>
        </Card>
        <Row>
          {type === "M4" && (
            <Col {...rotorColsAttrs}>
              <Card {...getRotorSuccessCol(fourthRotor)}>
                <Card.Body>
                  <Card.Title>Fourth Rotor</Card.Title>
                  <ThinRotor
                    type={fourthRotor?.type}
                    ringPosition={fourthRotor?.ringPosition}
                    windowLetter={fourthRotor?.windowLetter}
                    onChangeRotorType={handleChangeRotorType("fourth")}
                    onChangeRingPosition={handleChangeRotorRingPosition(
                      "fourth"
                    )}
                    onChangeWindowLetter={handleChangeWindowLetter("fourth")}
                  />
                </Card.Body>
              </Card>
            </Col>
          )}
          <Col {...rotorColsAttrs}>
            <Card {...getRotorSuccessCol(leftRotor)}>
              <Card.Body>
                <Card.Title>Left Rotor</Card.Title>
                <Rotor
                  type={leftRotor?.type}
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
          <Col {...rotorColsAttrs}>
            <Card {...getRotorSuccessCol(centerRotor)}>
              <Card.Body>
                <Card.Title>Center Rotor</Card.Title>
                <Rotor
                  type={centerRotor?.type}
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
            <Card {...getRotorSuccessCol(rightRotor)}>
              <Card.Body>
                <Card.Title>Right Rotor</Card.Title>
                <Rotor
                  type={rightRotor?.type}
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
      </div>
      <Card bg="info" text="info">
        <Card.Body>
          <Card.Title>Plug board</Card.Title>
          <PlugBoard
            wirings={wirings}
            onAddWiring={handleAddPlugBoardWiring}
            onRemoveWiring={handleRemovePlugBoardWiring}
          />
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Keyboard</Card.Title>
          <Keyboard
            onInput={handleInput}
            lastEncodedLetter={output.charAt(output.length - 1)}
          />
        </Card.Body>
      </Card>
    </div>
  );

  return null;
};

export default Enigma;
