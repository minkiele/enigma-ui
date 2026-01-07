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
          <h1 className="display-1">EnigmaUI</h1>
          <p className="lead">
            It was 2016 when I wrote the first version of EnigmaUI. It was a
            different React, a different decade, I had a different job. Over
            time I integrated other features into my implementation of the{" "}
            <em>Enigma machine</em>, like the <em>Reflector D</em> and the{" "}
            <em>Uhr</em>. Providing a UI for them was starting to be a challenge
            because I had to rewrite all the code into a modern language. But
            then I did it.
          </p>
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
          <a href="https://minkiele.github.io/">https://minkiele.github.io/</a>
        </Container>
      </footer>
    </>
  );
};

export default App;
