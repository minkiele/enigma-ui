import { useId, type ChangeEvent } from "react";

import { Form } from "react-bootstrap";
import type { BaseRotorProps } from "./BaseRotor.models";
import { normalizeInput } from "enigma-minkiele/enigma/lib/utils";
import { ringPositions } from "./BaseRotor.utils";
import type { RotorType, ThinRotorType } from "../../../../models";

export const INITIAL_ROTOR_TYPE = "";
export const INITIAL_RING_POSITION = 0;
export const INITIAL_WINDOW_POSITION = "A";

const BaseRotor = <T extends RotorType | ThinRotorType>({
  onChangeRotorType,
  onChangeRingPosition,
  onChangeWindowLetter: onUpdateWindowLetter,
  position,
  ringPosition = INITIAL_RING_POSITION,
  type,
  windowLetter = INITIAL_WINDOW_POSITION,
  children,
}: BaseRotorProps<T>) => {
  const rotorTypeId = useId();
  const ringPositionId = useId();
  const windowLetterId = useId();
  return (
    <div className="enigmaRotor">
      <Form.Group className="enigmaRotorType" controlId={rotorTypeId}>
        <Form.Label>Type</Form.Label>
        <Form.Select
          className="select"
          value={type}
          onChange={(evt) => {
            onChangeRotorType(evt, evt.target.value as T, position);
          }}
        >
          <option value="">Choose a rotor</option>
          {children}
        </Form.Select>
      </Form.Group>
      <Form.Group
        className="enigmaRotorRingPosition"
        controlId={ringPositionId}
      >
        <Form.Label>Ring Position</Form.Label>
        <Form.Select
          className="select"
          value={ringPosition}
          onChange={(evt) => {
            onChangeRingPosition(evt, Number(evt.target.value), position);
          }}
        >
          <option value="">Choose a ring position</option>
          {ringPositions}
        </Form.Select>
      </Form.Group>
      <Form.Group
        className="enigmaRotorWindowLetter"
        controlId={windowLetterId}
      >
        <Form.Label>Window Position</Form.Label>
        <Form.Control
          type="text"
          value={windowLetter}
          onChange={(evt) => {
            onUpdateWindowLetter(
              evt as ChangeEvent<HTMLInputElement>,
              normalizeInput(evt.target.value),
              position
            );
          }}
          maxLength={1}
          pattern="[A-Z]"
          size="sm"
        />
      </Form.Group>
    </div>
  );
};

export default BaseRotor;
