import type { Wiring } from "../Enigma/Enigma.models";
import type { SwapperProps } from "./Swapper.models";
import NewSwapperWiring from "./components/NewSwapperWiring/NewSwapperWiring";
import SwapperWiring from "./components/SwapperWiring/SwapperWiring";
import { Card, ListGroup } from "react-bootstrap";

const Swapper = <T extends Wiring>({
  wirings,
  onAddWiring,
  onRemoveWiring,
  limit,
  forbidden,
  lifo,
}: SwapperProps<T>) => (
  <>
    {wirings.length > 0 && (
      <ListGroup className="mb-3">
        {wirings.map((wiring, index) => (
          <ListGroup.Item key={`${wiring[0]}${wiring[1]}`}>
            <SwapperWiring
              wiring={wiring}
              onRemoveWiring={onRemoveWiring}
              disabled={lifo === true && index < wirings.length - 1}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
    )}
    {(limit == null || wirings.length < limit) && (
      <Card body className="bg-secondary-subtle">
        <p>New Wiring</p>
        <NewSwapperWiring
          wirings={wirings}
          onAddWiring={onAddWiring}
          forbidden={forbidden}
        />
      </Card>
    )}
  </>
);

export default Swapper;
