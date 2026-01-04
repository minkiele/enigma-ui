import type { ReflectorProps } from "./Reflector.models";
import {
  reflectorTypes as fullSizeReflectorTypes,
  thinReflectorTypes,
} from "./Reflector.utils";
import ReflectorD from "./components/ReflectorD/ReflectorD";
import { useId, useMemo, type ChangeEventHandler, type FC } from "react";
import { Card, Form } from "react-bootstrap";

const Reflector: FC<ReflectorProps> = ({
  value,
  all,
  wirings,
  onChangeType,
  onAddWiring,
  onRemoveWiring,
}) => {
  const options = useMemo(
    () => fullSizeReflectorTypes.concat(all ? thinReflectorTypes : []),
    [all],
  );

  const id = useId();
  const handleChangeType: ChangeEventHandler<HTMLSelectElement> = (evt) => {
    onChangeType(evt, evt.target.value as NonNullable<typeof value>);
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
            {options.map((reflector) => (
              <option key={reflector} value={reflector}>
                {reflector}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        {value === "D" && (
          <Card className="mt-3">
            <Card.Header>Reflector D Wirings</Card.Header>
            <Card.Body>
              <ReflectorD
                wirings={wirings ?? []}
                onAddWiring={onAddWiring}
                onRemoveWiring={onRemoveWiring}
              />
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Reflector;
