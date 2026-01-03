import {
  useId,
  useState,
  type ChangeEventHandler,
  type FC,
  type MouseEventHandler,
} from "react";
import type { KeyboardProps } from "./Keyboard.models";
import { normalizeInput } from "enigma-minkiele/enigma/lib/utils";
import { Button, Col, Form, Row } from "react-bootstrap";
import { DEFAULT_GROUP_BY } from "./Keyboard.utils";

const Keyboard: FC<KeyboardProps> = ({
  input,
  output,
  disabled,
  onInput,
  onReset,
}) => {
  const inputId = useId();
  const groupById = useId();

  const [groupBy, setGroupBy] = useState(DEFAULT_GROUP_BY);
  const resetState: MouseEventHandler<HTMLButtonElement> = (evt) => {
    setGroupBy(DEFAULT_GROUP_BY);
    onReset?.(evt);
  };

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (evt) => {
    onInput(evt, normalizeInput(evt.target.value));
  };

  const getGroupedLetters = (letters: string) => {
    let output = "";
    for (let i = 0; i < letters.length; i += groupBy) {
      output += `${letters.substring(i, i + groupBy)} `;
    }
    return output.trim();
  };

  const isGroupBy = groupBy > 0;

  const handleChangeGroupBy: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const nval = parseInt(evt.target.value);
    if (nval >= 0) {
      setGroupBy(nval);
    }
  };

  return (
    <div className="keyboard">
      <Row className="mb-3">
        <Col className="keyboardInput" xs={12} md={2}>
          <Form.Group controlId={inputId}>
            <div className={output.length ? "input-group" : undefined}>
              <Form.Control
                type="text"
                value=""
                onChange={handleChangeInput}
                maxLength={1}
                pattern="[A-Z]"
                placeholder="Input"
                disabled={disabled}
              />
              <Button
                variant="danger"
                className={output.length ? "input-group-btn" : "d-none"}
                onClick={resetState}
              >
                Reset
              </Button>
            </div>
          </Form.Group>
        </Col>
        <Col className="keyboardInput" xs={12} md={5}>
          <strong>Input:</strong>&nbsp;
          <code>{isGroupBy ? getGroupedLetters(input) : input}</code>
        </Col>
        <Col className="keyboardOutput" xs={12} md={5}>
          <strong>Output:</strong>&nbsp;
          <code>{isGroupBy ? getGroupedLetters(output) : output}</code>
        </Col>
      </Row>
      <Row>
        <Col className="keyboardOutput" xs={12} md={2}>
          <Form.Group className="splitSize" controlId={groupById}>
            <Form.Label>Group output by</Form.Label>
            <Form.Control
              type="number"
              value={groupBy}
              onChange={handleChangeGroupBy}
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default Keyboard;
