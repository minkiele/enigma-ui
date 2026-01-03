import { type FC } from "react";
import type { PlugBoardProps } from "./PlugBoard.models";
import { Card, ListGroup } from "react-bootstrap";
import PlugBoardWiring from "./components/PlugboardWiring/PlugboardWiring";
import NewPlugBoardWiring from "./components/NewPlugBoardWiring/NewPlugBoardWiring";

export const PLUGBOARD_MAX_SIZE = 10;

const PlugBoard: FC<PlugBoardProps> = ({
  wirings,
  onAddWiring,
  onRemoveWiring,
}) => {
  return (
    <div className="enigmaPlugBoard">
      {wirings.length > 0 && <ListGroup className="enigmaPlugBoardWirings mb-3">
        {wirings.map((wiring) => (
          <ListGroup.Item key={`${wiring[0]}${wiring[1]}`}>
            <PlugBoardWiring wiring={wiring} onRemoveWiring={onRemoveWiring} />
          </ListGroup.Item>
        ))}
      </ListGroup>}
      {wirings.length < PLUGBOARD_MAX_SIZE && (
        <Card body className="plugBoardAddWiring bg-light">
          <p>New Wiring</p>
          <NewPlugBoardWiring wirings={wirings} onAddWiring={onAddWiring} />
        </Card>
      )}
    </div>
  );
};

export default PlugBoard;
