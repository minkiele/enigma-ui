import type { KeyboardProps } from "./Keyboard.models";
import { normalizeInput } from "enigma-minkiele/enigma/lib/utils";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEventHandler,
  type FC,
  type KeyboardEventHandler,
  type MouseEventHandler,
} from "react";
import { Button, Col, Form, InputGroup, ListGroup, Row } from "react-bootstrap";

const Keyboard: FC<KeyboardProps> = ({
  input,
  output,
  disabled,
  backspaceEnabled: isBackspaceEnabled,
  groupBy: propGroupBy,
  type,
  onInput,
  onReset,
  onBackspace,
  onApplyEncodeKey,
  onApplyDecodeKey,
}) => {
  const inputId = useId();
  const groupById = useId();

  const [groupBy, setGroupBy] = useState(propGroupBy);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setGroupBy(propGroupBy);
  }, [propGroupBy]);

  const resetState: MouseEventHandler<HTMLButtonElement> = (evt) => {
    setGroupBy(propGroupBy);
    onReset?.(evt);
    inputRef.current?.focus();
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

  const incGroupBy: MouseEventHandler<HTMLButtonElement> = () => {
    setGroupBy((prev) => prev + 1);
  };
  const decGroupBy: MouseEventHandler<HTMLButtonElement> = () => {
    setGroupBy((prev) => Math.max(prev - 1, 0));
  };

  const isApplyKeyAvailable =
    (type === "M3" && input.length === 3) ||
    (type === "M4" && input.length === 4);

  const handleApplyEncodeKey: MouseEventHandler<HTMLButtonElement> = (evt) => {
    onApplyEncodeKey?.(evt, input);
  };

  const handleApplyDecodeKey: MouseEventHandler<HTMLButtonElement> = (evt) => {
    onApplyDecodeKey?.(evt, output);
  };

  return (
    <>
      <Row className="mb-3">
        <Col className="mb-3 mb-md-0" xs={12} md={4} lg={2}>
          <Form.Group controlId={inputId}>
            <Form.Label visuallyHidden>Type in the text to encode</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                value=""
                onChange={handleChangeInput}
                onKeyUp={handleBackspace}
                maxLength={1}
                pattern="[A-Z]"
                placeholder="Input"
                disabled={disabled}
                ref={inputRef}
              />
              {output.length > 0 && (
                <Button
                  variant="danger"
                  className="input-group-btn"
                  onClick={resetState}
                >
                  Reset
                </Button>
              )}
            </InputGroup>
          </Form.Group>
        </Col>
        <Col className="mb-3 mb-md-0" xs={12} md={4} lg={5}>
          <strong>Input:</strong>&nbsp;
          <code>{isGroupBy ? getGroupedLetters(input) : input}</code>
          {isApplyKeyAvailable && onApplyEncodeKey && (
            <>
              {" "}
              <Button size="sm" onClick={handleApplyEncodeKey}>
                Apply as encoding key
              </Button>
            </>
          )}
        </Col>
        <Col xs={12} md={4} lg={5}>
          <strong>Output:</strong>&nbsp;
          <code>{isGroupBy ? getGroupedLetters(output) : output}</code>
          {isApplyKeyAvailable && onApplyDecodeKey && (
            <>
              {" "}
              <Button size="sm" onClick={handleApplyDecodeKey}>
                Apply as decoding key
              </Button>
            </>
          )}
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={4} lg={2}>
          <Form.Group controlId={groupById}>
            <Form.Label>Group output by</Form.Label>
            <InputGroup size="sm">
              <Form.Control
                type="number"
                value={groupBy}
                onChange={handleChangeGroupBy}
              />
              <Button
                className="input-group-btn"
                onClick={decGroupBy}
                disabled={groupBy <= 0}
                aria-label={
                  groupBy === 0
                    ? undefined
                    : groupBy === 1
                      ? "Ungroup output"
                      : `Group output by ${groupBy - 1}`
                }
              >
                -
              </Button>
              <Button
                className="input-group-btn"
                onClick={incGroupBy}
                aria-label={`Group output by ${groupBy + 1}`}
              >
                +
              </Button>
            </InputGroup>
          </Form.Group>
        </Col>
        {output.length > 0 && (
          <Col
            xs={12}
            md={8}
            lg={10}
            className="mt-3 mt-md-0 d-flex align-items-md-end"
          >
            <ListGroup>
              {isBackspaceEnabled ? (
                <ListGroup.Item>
                  Restore available by pressing <em>Backspace</em> or{" "}
                  <em>Reset</em> button. It works even on mobile phones!
                </ListGroup.Item>
              ) : (
                <ListGroup.Item>Restore disabled</ListGroup.Item>
              )}
            </ListGroup>
          </Col>
        )}
      </Row>
    </>
  );
};

Keyboard.displayName = "Keyboard";

export default Keyboard;
