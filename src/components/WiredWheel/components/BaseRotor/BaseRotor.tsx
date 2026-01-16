import type { RotorType, ThinRotorType } from "../../../../models";
import type { BaseRotorProps } from "./BaseRotor.models";
import { ringPositions, windowLetters } from "./BaseRotor.utils";
import { normalizeInput } from "enigma-minkiele/enigma/lib/utils";
import { useId, type ChangeEventHandler } from "react";
import { Form } from "react-bootstrap";

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
    evt,
  ) => {
    onChangeRotorType(evt, evt.target.value as T);
  };

  const handleChangeRingPosition: ChangeEventHandler<HTMLSelectElement> = (
    evt,
  ) => {
    onChangeRingPosition(evt, Number(evt.target.value));
  };

  const handleChangeWindowLetter: ChangeEventHandler<HTMLSelectElement> = (
    evt,
  ) => {
    onChangeWindowLetter(evt, normalizeInput(evt.target.value));
  };

  return (
    <>
      <Form.Group className="mb-3" controlId={rotorTypeId}>
        <Form.Label>Type</Form.Label>
        <Form.Select value={value ?? ""} onChange={handleChangeRotorType}>
          {value == null && <option value="">Choose a rotor</option>}
          {options.map(({ value, label, disabled }) => (
            <option key={value} value={value} disabled={disabled}>
              {label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId={ringPositionId}>
        <Form.Label>Ring Position</Form.Label>
        <Form.Select
          value={ringPosition}
          onChange={handleChangeRingPosition}
          disabled={value == null}
        >
          {ringPositions}
        </Form.Select>
      </Form.Group>
      <Form.Group controlId={windowLetterId}>
        <Form.Label>Window Position</Form.Label>
        <Form.Select
          value={windowLetter}
          disabled={value == null}
          onChange={handleChangeWindowLetter}
        >
          {windowLetters}
        </Form.Select>
      </Form.Group>
    </>
  );
};

export default BaseRotor;
