import { useEffect, useState, type ChangeEvent, type FC } from "react";
import type { KeyboardProps } from "./Keyboard.models";
import { initialState } from "./Keyboard.utils";
import { normalizeInput } from "enigma-minkiele/enigma/lib/utils";
import { Button, Col, Form, Row } from "react-bootstrap";

const Keyboard: FC<KeyboardProps> = ({ lastEncodedLetter, onInput }) => {
  const [
    { groupBy, input, inputLetter, output, pendingInputLetter },
    setState,
  ] = useState(initialState);
  const resetState = () => {
    setState(initialState);
  };

  const updateInput = (evt: ChangeEvent<HTMLInputElement>, value: string) => {
    const normalizedValue = normalizeInput(value);
    setState((state) => ({
      ...state,
      inputLetter: "",
      pendingInputLetter: normalizedValue,
    }));
    onInput(evt, value);
  };

  useEffect(() => {
    if (pendingInputLetter) {
      setState(({ input, output, pendingInputLetter, ...oldState }) => ({
        ...oldState,
        pendingInputLetter: "",
        input: lastEncodedLetter ? `${input}${pendingInputLetter}` : input,
        output: lastEncodedLetter ? `${output}${lastEncodedLetter}` : output,
      }));
    }
  }, [pendingInputLetter, lastEncodedLetter]);

  const getGroupedLetters = (letters: string) => {
    let output = "";
    for (let i = 0; i < letters.length; i += groupBy) {
      output += `${letters.substring(i, i + groupBy)} `;
    }
    return output.trim();
  };

  const isGroupBy = groupBy > 0;

  const updateGroupBy = (value: string) => {
    const nval = parseInt(value);
    if (nval >= 0) {
      setState((state) => ({
        ...state,
        groupBy: nval,
      }));
    }
  };

  return (
    <div className="keyboard">
      <Row>
        <Col className="keyboardInput" xs={12} md={2}>
          <Form.Group>
            <div className={output.length ? "input-group" : undefined}>
              <Form.Control
                type="text"
                value={inputLetter}
                onChange={(evt) => {
                  updateInput(
                    evt as ChangeEvent<HTMLInputElement>,
                    evt.target.value
                  );
                }}
                maxLength={1}
                pattern="[A-Z]"
                size="sm"
                placeholder="Input"
              />
              <span className={output.length ? "input-group-btn" : "hidden"}>
                <Button variant="danger" onClick={resetState}>
                  Reset
                </Button>
              </span>
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
          <Form.Group className="splitSize">
            <label>Group output by</label>
            <Form.Control
              type="number"
              value={groupBy}
              onChange={(evt) => {
                updateGroupBy(evt.target.value);
              }}
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default Keyboard;
