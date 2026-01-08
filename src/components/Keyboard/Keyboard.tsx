import type { KeyboardProps } from "./Keyboard.models";
import { DEFAULT_GROUP_BY } from "./Keyboard.utils";
import classNames from "classnames";
import { normalizeInput } from "enigma-minkiele/enigma/lib/utils";
import {
  useId,
  useState,
  type ChangeEventHandler,
  type FC,
  type KeyboardEventHandler,
  type MouseEventHandler,
} from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const Keyboard: FC<KeyboardProps> = ({
  input,
  output,
  disabled,
  backspaceEnabled: isBackspaceEnabled,
  onInput,
  onReset,
  onBackspace,
}) => {
  const inputId = useId();
  const groupById = useId();

  const [groupBy, setGroupBy] = useState(DEFAULT_GROUP_BY);
  const resetState: MouseEventHandler<HTMLButtonElement> = (evt) => {
    setGroupBy(DEFAULT_GROUP_BY);
    onReset?.(evt);
  };

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (evt) => {
    try {
      onInput(evt, normalizeInput(evt.target.value));
    } catch {
      /* DO NOTHING */
    }
  };

  const handleBackspace: KeyboardEventHandler<HTMLInputElement> = (evt) => {
    if (isBackspaceEnabled && evt.key === "Backspace") {
      onBackspace(evt);
    }
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
    <div>
      <Row className="mb-3">
        <Col className="mb-3 mb-md-0" xs={12} md={4} lg={2}>
          <Form.Group controlId={inputId}>
            <Form.Label visuallyHidden>Type in the text to encode</Form.Label>
            <div className={classNames({ "input-group": output.length })}>
              <Form.Control
                type="text"
                value=""
                onChange={handleChangeInput}
                onKeyUp={handleBackspace}
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
        <Col className="mb-3 mb-md-0" xs={12} md={4} lg={5}>
          <strong>Input:</strong>&nbsp;
          <code>{isGroupBy ? getGroupedLetters(input) : input}</code>
        </Col>
        <Col xs={12} md={4} lg={5}>
          <strong>Output:</strong>&nbsp;
          <code>{isGroupBy ? getGroupedLetters(output) : output}</code>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={4} lg={2}>
          <Form.Group controlId={groupById}>
            <Form.Label>Group output by</Form.Label>
            <Form.Control
              type="number"
              value={groupBy}
              onChange={handleChangeGroupBy}
            />
          </Form.Group>
        </Col>
        {output.length > 0 && (
          <Col
            xs={12}
            md={8}
            lg={10}
            className="mt-3 mt-md-0 d-flex align-items-md-center"
          >
            <div>
              {isBackspaceEnabled ? (
                <>
                  Restore available by pressing <em>Backspace</em> or{" "}
                  <em>Reset</em> button
                </>
              ) : (
                <>Restore disabled</>
              )}
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Keyboard;
