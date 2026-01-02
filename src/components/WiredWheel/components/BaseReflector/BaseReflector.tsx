import { useId, type FC } from "react";
import type { BaseReflectorProps } from "./BaseReflector.models";
import { Form } from "react-bootstrap";

export const INITIAL_REFLECTOR_TYPE = "";

const BaseReflector: FC<BaseReflectorProps> = ({
  type = INITIAL_REFLECTOR_TYPE,
  onChangeType,
  children,
}) => {
  const id = useId();
  return (
    <div className="enigmaReflector">
      <div className="enigmaReflectorType">
        <Form.Group controlId={id}>
          <Form.Label>Type</Form.Label>
          <Form.Select
            className="select"
            value={type}
            onChange={(evt) => {
              onChangeType(evt, evt.target.value);
            }}
          >
            <option value="">Choose a reflector</option>
            {children}
          </Form.Select>
        </Form.Group>
      </div>
    </div>
  );
};

export default BaseReflector;
