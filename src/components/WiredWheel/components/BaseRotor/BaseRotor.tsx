import { useId, type ChangeEventHandler } from "react";
import { Form } from "react-bootstrap";
import type { BaseRotorProps } from "./BaseRotor.models";
import { normalizeInput } from "enigma-minkiele/enigma/lib/utils";
import { ringPositions } from "./BaseRotor.utils";
import type { RotorType, ThinRotorType } from "../../../../models";

const BaseRotor = <T extends RotorType | ThinRotorType>({
  onChangeRotorType,
  onChangeRingPosition,
  onChangeWindowLetter,
  value,
  ringPosition = 0,
  windowLetter = "A",
  options,
}: BaseRotorProps<T>) => {
  const rotorTypeId = useId();
  const ringPositionId = useId();
  const windowLetterId = useId();

  const handleChangeRotorType: ChangeEventHandler<HTMLSelectElement> = (
    evt
  ) => {
    onChangeRotorType(evt, evt.target.value as T);
  };

  const handleChangeRingPosition: ChangeEventHandler<HTMLSelectElement> = (
    evt
  ) => {
    onChangeRingPosition(evt, Number(evt.target.value));
  };

  const handleChangeWindowLetter: ChangeEventHandler<HTMLInputElement> = (
    evt
  ) => {
    onChangeWindowLetter(evt, normalizeInput(evt.target.value));
  };

  return (
    <div className="enigmaRotor">
      <Form.Group className="enigmaRotorType" controlId={rotorTypeId}>
        <Form.Label>Type</Form.Label>
        <Form.Select
          className="select"
          value={value ?? ""}
          onChange={handleChangeRotorType}
        >
          {value == null && <option value="">Choose a rotor</option>}
          {options.map(({ value, label, disabled }) => (
            <option key={value} value={value} disabled={disabled}>
              {label}
            </option>
          ))}
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
          onChange={handleChangeRingPosition}
          disabled={value == null}
        >
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
          disabled={value == null}
          onChange={handleChangeWindowLetter}
          maxLength={1}
          pattern="[A-Z]"
        />
      </Form.Group>
    </div>
  );
};

export default BaseRotor;
