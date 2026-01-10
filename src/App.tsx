import Readme from "../README.md";
import { components } from "./App.utils";
import { useTheme } from "./hooks/theme";
import "./styles.scss";
import { lazy, Suspense, type FC } from "react";
import { Container } from "react-bootstrap";

const Enigma = lazy(() => import("./components/Enigma/Enigma"));

const App: FC = () => {
  useTheme();
  return (
    <>
      <Container>
        <header>
          <Readme components={components} />
        </header>
        <main>
          <Suspense fallback={<p>Loading Enigma...</p>}>
            <Enigma />
          </Suspense>
        </main>
      </Container>
      <footer className="mt-5 py-3 bg-body-secondary">
        <Container>
          Made near Venice with love ❤️ and some very badly misused free time
          during the '25s Christmas holidays. For other very badly misused free
          time you can visit{" "}
          <a href="https://minkiele.github.io/">https://minkiele.github.io/</a>.
          Current version: {__APP_VERSION__}.
        </Container>
      </footer>
    </>
  );
};

export default App;
