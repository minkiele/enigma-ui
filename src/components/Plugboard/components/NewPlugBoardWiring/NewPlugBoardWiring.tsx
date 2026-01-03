import {
  useId,
  useMemo,
  useState,
  type ChangeEventHandler,
  type FC,
  type MouseEventHandler,
} from "react";
import type { NewPlugBoardWiringProps } from "./NewPlugBoardWiring.models";
import { getNewWiring } from "./NewPlugBoardWiring.utils";
import { getLetter, normalizeInput } from "enigma-minkiele/enigma/lib/utils";
import { Button, Col, Form, Row } from "react-bootstrap";
import type { PlugBoardWiring } from "../../../Enigma/Enigma.models";

const NewPlugBoardWiring: FC<NewPlugBoardWiringProps> = ({
  onAddWiring,
  wirings,
}) => {
  const plug0Id = useId();
  const plug1Id = useId();
  const [wiring, setState] = useState<PlugBoardWiring>(getNewWiring);
  const isWiringComplete = useMemo(() => {
    try {
      wiring.forEach(normalizeInput);
      return true;
    } catch {
      return false;
    }
  }, [wiring]);
  const handleUpdatePlug =
    (key: 0 | 1): ChangeEventHandler<HTMLSelectElement> =>
    (evt) => {
      const value = evt.target.value;
      setState(([first, second]) => (key ? [first, value] : [value, second]));
    };

  const getForbiddenLetters = (add?: string) =>
    wirings
      .reduce<Array<string>>((acc, wiring) => [...acc, ...wiring], [])
      .concat(add ? add : []);

  const renderAlphabet = (disabledLetter = "") => {
    const alphabet = [];

    const forbiddenLetters = getForbiddenLetters(disabledLetter);

    for (let i = 0; i < 26; i += 1) {
      const letter = getLetter(i);
      alphabet.push(
        <option
          key={letter.toString()}
          disabled={forbiddenLetters.includes(letter)}
          value={letter}
        >
          {letter}
        </option>
      );
    }
    return alphabet;
  };

  const handleAddWiring: MouseEventHandler<HTMLButtonElement> = (evt) => {
    if (isWiringComplete) {
      onAddWiring(evt, wiring);
      setState(getNewWiring);
    }
  };

  return (
    <Row className="enigmaPlugBoardWiring">
      <Col xs={12} sm={5}>
        <Form.Group controlId={plug0Id}>
          <Form.Label visuallyHidden>First letter</Form.Label>
          <Form.Select
            className="select"
            value={wiring[0]}
            onChange={handleUpdatePlug(0)}
          >
            <option value=""></option>
            {renderAlphabet(wiring[1])}
          </Form.Select>
        </Form.Group>
      </Col>
      <Col xs={12} sm={5}>
        <Form.Group controlId={plug1Id}>
          <Form.Label visuallyHidden>Second letter</Form.Label>
          <Form.Select
            className="select"
            value={wiring[1]}
            onChange={handleUpdatePlug(1)}
          >
            <option value=""></option>
            {renderAlphabet(wiring[0])}
          </Form.Select>
        </Form.Group>
      </Col>
      <Col xs={12} sm={2} className="d-grid">
        <Button
          variant="primary"
          disabled={!isWiringComplete}
          onClick={handleAddWiring}
        >
          Plug
        </Button>
      </Col>
    </Row>
  );
};

export default NewPlugBoardWiring;
