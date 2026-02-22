import ExportNotes from "../../notes/Export.md";
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
      <ExportNotes />
      <div className="d-grid d-md-block">
        <Button
          as="a"
          href={href}
          disabled={!isMachineValid}
          download="Enigma.json"
        >
          Export
        </Button>
      </div>
    </>
  );
};

export default Export;
