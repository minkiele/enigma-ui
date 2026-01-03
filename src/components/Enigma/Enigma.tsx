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
import type { RotorIdentifier } from "./Enigma.models";
import PlugBoard from "../Plugboard/PlugBoard";
import type { PlugBoardProps } from "../Plugboard/PlugBoard.models";
import type { BaseRotorProps } from "../WiredWheel/components/BaseRotor/BaseRotor.models";
import Keyboard from "../Keyboard/Keyboard";
import type { KeyboardProps } from "../Keyboard/Keyboard.models";
import classNames from "classnames";

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
    input,
    output,
    encode,
    clear,
  } = useEnigma();

  const handleChangeType: TypeSelectorProps["onChangeType"] = (_, type) => {
    setMachineType(type);
  };

  const handleChangeReflector: BaseReflectorProps<
    ReflectorType | ThinReflectorType
  >["onChangeType"] = (_, type) => {
    setReflectorType(type);
  };

  const rotorColsAttrs = { xs: 12, md: type === "M3" ? 4 : 3 };

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
      <Card className="mb-3">
        <Card.Header className="bg-info-subtle">Machine type</Card.Header>
        <Card.Body>
          <TypeSelector type={type} onChangeType={handleChangeType} />
        </Card.Body>
      </Card>
      <div className="enigmaConfiguration">
        <Card className={classNames("mb-3")}>
          <Card.Header
            className={classNames({
              "text-bg-success": reflector,
            })}
          >
            {type === "M3" ? "Reflector" : "Thin reflector"}
          </Card.Header>
          <Card.Body>
            {type === "M3" ? (
              <Reflector
                value={reflector as ReflectorType}
                onChangeType={handleChangeReflector}
              />
            ) : (
              <ThinReflector
                value={reflector as ThinReflectorType}
                onChangeType={handleChangeReflector}
              />
            )}
          </Card.Body>
        </Card>
        <Row className="mb-3">
          {type === "M4" && (
            <Col {...rotorColsAttrs} className="mb-3 mb-md-0">
              <Card>
                <Card.Header
                  className={classNames({
                    "text-bg-success": fourthRotor?.type,
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
                    onChangeRingPosition={handleChangeRotorRingPosition(
                      "fourth"
                    )}
                    onChangeWindowLetter={handleChangeWindowLetter("fourth")}
                  />
                </Card.Body>
              </Card>
            </Col>
          )}
          <Col {...rotorColsAttrs} className="mb-3 mb-md-0">
            <Card>
              <Card.Header
                className={classNames({ "text-bg-success": leftRotor?.type })}
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
                className={classNames({ "text-bg-success": centerRotor?.type })}
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
                className={classNames({ "text-bg-success": rightRotor?.type })}
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
      </div>
      <Card className="mb-3">
        <Card.Header className="bg-info-subtle">Plug board</Card.Header>
        <Card.Body>
          <PlugBoard
            wirings={wirings}
            onAddWiring={handleAddPlugBoardWiring}
            onRemoveWiring={handleRemovePlugBoardWiring}
          />
        </Card.Body>
      </Card>
      <Card>
        <Card.Header className="bg-info-subtle">Keyboard</Card.Header>
        <Card.Body>
          <Keyboard
            input={input}
            output={output}
            onInput={handleInput}
            onReset={clear}
          />
        </Card.Body>
      </Card>
    </div>
  );

  return null;
};

export default Enigma;
