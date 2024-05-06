import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

document.body.setAttribute("data-bs-theme", "dark");

function App() {
  const [partita, setPartita] = useState("");
  const [numero, setNumero] = useState("");
  const [messaggio, setMessaggio] = useState("");

  const [caricamento, setInCaricamento] = useState(false);
  const [indovinato, setIndovinato] = useState(false);

  useEffect(() => {
    nuovaPartita();
  }, []);

  async function nuovaPartita() {
    setInCaricamento(true);
    setIndovinato(false);
    setNumero("");
    setMessaggio("");
    const response = await fetch(`http://localhost:8080/partita`, {
      method: "POST",
    });
    setPartita(await response.json());
    setInCaricamento(false);
  }

  async function tentativo() {
    setInCaricamento(true);
    setNumero("");
    const response = await fetch(
      `http://localhost:8080/partita/${partita.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: partita.id, numero: numero }),
      }
    );
    let risposta = await response.json();
    partita.tentativi = risposta["tentativi"];
    if (risposta["risultato"] < 0) {
      setMessaggio("Il numero inserito è troppo PICCOLO");
    } else if (risposta["risultato"] > 0) {
      setMessaggio("Il numero inserito è troppo GRANDE");
    } else {
      setIndovinato(true);
    }
    setInCaricamento(false);
  }

  function HandlerNumero(e) {
    setNumero(e.target.value);
  }

  return (
    <div className="App">
      <Card
        className="mx-auto w-50 position-absolute top-50 start-50 translate-middle background"
      >
        <Card className="m-1">
          <h1>Indovina numero</h1>
          <Button className="w-50 m-1 mx-auto" onClick={nuovaPartita}>
            Nuova partita
          </Button>
          {caricamento ? (
            <h5>Caricamento...</h5>
          ) : (
            <>
              <h5>ID: {partita.id}</h5>
              <h5>Tentativi: {partita.tentativi}</h5>
              {indovinato ? (
                <h5>Hai indovinato!!</h5>
              ) : (
                <>
                  <p>Inserisci un numero tra 1 e 100:</p>
                  <p>{messaggio}</p>
                  <FormControl
                    name="numero"
                    value={numero}
                    onChange={HandlerNumero}
                    type="number"
                    min="1"
                    max="100"
                    className="w-50 m-1 mx-auto"
                  ></FormControl>
                  <Button className="w-50 m-1 mx-auto" onClick={tentativo}>
                    Invia
                  </Button>
                </>
              )}
            </>
          )}
        </Card>
      </Card>
    </div>
  );
}

export default App;
