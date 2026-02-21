import type { ExportProps } from "./Export.models";
import { useMemo, type FC } from "react";
import { Button } from "react-bootstrap";

const Export: FC<ExportProps> = ({ isMachineValid, ...exportableProps }) => {
  const href = useMemo(() => {
    if (isMachineValid) {
      const serializedState = JSON.stringify(exportableProps);
      const blob = new Blob([serializedState], { type: "application/json" });
      return URL.createObjectURL(blob);
    }
    return "#";
  }, [exportableProps, isMachineValid]);

  return (
    <>
      <p>
        Export current Enigma settings. Settings become exportable once the
        machine is in a valid state.
      </p>
      <Button
        as="a"
        href={href}
        disabled={!isMachineValid}
        download="enigma.json"
      >
        Export
      </Button>
    </>
  );
};

export default Export;
