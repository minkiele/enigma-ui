import { Col, Form, Row } from "react-bootstrap";
import type { UhrProps } from "./Uhr.models";
import { useId, type ChangeEventHandler, type FC } from "react";

const Uhr: FC<UhrProps> = ({
  uhrSetting,
  onPlugUhr,
  onUnplugUhr,
  onSetUhrSetting,
}) => {
  const checkboxId = useId();
  const uhrSettingId = useId();

  const handleToggleUhr: ChangeEventHandler<HTMLInputElement> = (evt) => {
    if (evt.target.checked) {
      onPlugUhr(evt);
    } else {
      onUnplugUhr(evt);
    }
  };

  const handleSetUhrSetting: ChangeEventHandler<HTMLSelectElement> = (evt) => {
    onSetUhrSetting(evt, Number(evt.target.value));
  };

  return (
    <div>
      <Row>
        <Col xs={12} sm={4}>
          <Form.Group controlId={checkboxId}>
            <Form.Check
              label="Use the Uhr"
              onChange={handleToggleUhr}
              checked={uhrSetting != null}
            />
          </Form.Group>
        </Col>
        <Col xs={12} sm={8}>
          <Form.Group controlId={uhrSettingId}>
            <Form.Label>Setting</Form.Label>
            <Form.Select
              onChange={handleSetUhrSetting}
              value={uhrSetting ?? 0}
              disabled={uhrSetting == null}
            >
              {Array.from({ length: 40 }).map((_, setting) => (
                <option key={`setting-${setting}`} value={setting}>
                  {setting}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default Uhr;
