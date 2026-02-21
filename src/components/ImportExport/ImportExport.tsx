import type { ImportExportProps } from "./ImportExport.models";
import { useId, useMemo, useState, type ChangeEventHandler, type FC, type MouseEventHandler } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const ImportExport: FC<ImportExportProps> = ({
  isMachineValid,
  onImport,
  ...exportableProps
}) => {
  const href = useMemo(() => {
    if (isMachineValid) {
      const serializedState = JSON.stringify(exportableProps);
      const blob = new Blob([serializedState], { type: "application/json" });
      return URL.createObjectURL(blob);
    }
    return "#";
  }, [exportableProps, isMachineValid]);

  const importId = useId();

  const [imported, setImported] = useState<File>();

  const handleProvideImport: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setImported(evt.target.files?.[0]);
  }

  const handleImport: MouseEventHandler<HTMLButtonElement> = (evt) => {
    if(imported != null) {
      onImport(evt, exportableProps);
    }
  }
  
  return (
    <Row>
      <Col md={6} className="mb-3 mb-md-0">
        <p>
          Export current Enigma settings. Settings become exportable once the
          machine is in a valid state.
        </p>
        <div className="d-grid d-md-block">
          <Button
            as="a"
            href={href}
            disabled={!isMachineValid}
            download="enigma.json"
          >
            Export
          </Button>
        </div>
      </Col>
      <Col md={6}>
        <Form.Group controlId={importId} className="mb-3">
          <Form.Label>Import data</Form.Label>
          <Form.Control type="file" onChange={handleProvideImport} />
        </Form.Group>
        <div className="d-grid d-md-block">
          <Button disabled={imported == null} onClick={handleImport}>Import</Button>
        </div>
      </Col>
    </Row>
  );
};

export default ImportExport;
