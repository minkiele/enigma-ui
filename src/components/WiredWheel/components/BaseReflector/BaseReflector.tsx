import { useId, type ChangeEventHandler } from "react";
import type { BaseReflectorProps } from "./BaseReflector.models";
import { Form } from "react-bootstrap";
import type { ReflectorType, ThinReflectorType } from "../../../../models";

const BaseReflector = <T extends ReflectorType | ThinReflectorType>({
  value,
  options,
  onChangeType,
  children
}: BaseReflectorProps<T>) => {
  const id = useId();
  const handleChangeType: ChangeEventHandler<HTMLSelectElement> = (evt) => {
    onChangeType(evt, evt.target.value as T);
  };
  return (
    <div className="enigmaReflector">
      <div className="enigmaReflectorType">
        <Form.Group controlId={id}>
          <Form.Label>Type</Form.Label>
          <Form.Select
            className="select"
            value={value ?? ""}
            onChange={handleChangeType}
          >
            {value == null && <option value="">Choose a reflector</option>}
            {options.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        {children}
      </div>
    </div>
  );
};

export default BaseReflector;
