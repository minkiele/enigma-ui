import type { SwapperProps } from "./Swapper.models";
import { Card, ListGroup } from "react-bootstrap";
import SwapperWiring from "./components/SwapperWiring/SwapperWiring";
import NewSwapperWiring from "./components/NewSwapperWiring/NewSwapperWiring";
import type { Wiring } from "../Enigma/Enigma.models";

const Swapper = <T extends Wiring>({
  wirings,
  onAddWiring,
  onRemoveWiring,
  limit,
  forbidden,
}: SwapperProps<T>) => (
  <div className="swapper">
    {wirings.length > 0 && (
      <ListGroup className="swapper-wirings mb-3">
        {wirings.map((wiring) => (
          <ListGroup.Item key={`${wiring[0]}${wiring[1]}`}>
            <SwapperWiring wiring={wiring} onRemoveWiring={onRemoveWiring} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    )}
    {(limit == null || wirings.length < limit) && (
      <Card body className="swapper-wiring bg-light">
        <p>New Wiring</p>
        <NewSwapperWiring
          wirings={wirings}
          onAddWiring={onAddWiring}
          forbidden={forbidden}
        />
      </Card>
    )}
  </div>
);

export default Swapper;
