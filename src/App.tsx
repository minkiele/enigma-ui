import Readme from "../README.md";
import { components } from "./App.utils";
import { useTheme } from "./hooks/theme";
import Footer from "./notes/Footer.md";
import "./styles.scss";
import { lazy, Suspense, type FC } from "react";
import { Col, Container, Row } from "react-bootstrap";

const Enigma = lazy(() => import("./components/Enigma/Enigma"));

const Fallback: FC = () => (
  <p>
    <code>PIZLDEZ YVUUNBWZ</code>...
  </p>
);

const App: FC = () => {
  useTheme();
  return (
    <>
      <Container className="my-5">
        <header>
          <Readme components={components} />
        </header>
        <main>
          <Suspense fallback={<Fallback />}>
            <Enigma />
          </Suspense>
        </main>
      </Container>
      <footer className="py-3 bg-body-secondary">
        <Container>
          <Row>
            <Col xs={12} md={9} lg={10}>
              <Footer components={{ p: "div" }} />
            </Col>
            <Col xs={12} md={3} lg={2} className="text-md-end">
              Current version: {__APP_VERSION__}
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default App;
