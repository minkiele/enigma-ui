import { type FC } from "react";
import type { ReflectorProps } from "./Reflector.models";
import { reflectorTypes } from "./Reflector.utils";
import BaseReflector from "../components/BaseReflector/BaseReflector";
import { Card } from "react-bootstrap";
import ReflectorD from "./components/ReflectorD/ReflectorD";

const Reflector: FC<ReflectorProps> = ({
  value,
  wirings,
  onAddWiring,
  onRemoveWiring,
  ...props
}) => (
  <BaseReflector {...props} value={value} options={reflectorTypes}>
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
  </BaseReflector>
);

export default Reflector;
