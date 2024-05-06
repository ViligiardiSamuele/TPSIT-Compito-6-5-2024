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

  const [caricamento, setInCaricamento] = useState(false);
  const [indovinato, setIndovinato] = useState(false);

  async function nuovaPartita() {
    setInCaricamento(true);
    const response = await fetch(`http://localhost:8080/partita`, {
      method: "POST",
    });
    setPartita(await response.json());
    setInCaricamento(false);
  }

  async function tentativo() {
    setInCaricamento(true);
    const response = await fetch(`http://localhost:8080/partita/${partita.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: partita.id, numero: numero }),
    });
    response = await response.json();
    if(response['risultato'] = -1){

    } else if (response['risultato'])
    }
    setInCaricamento(false);
  }

  useEffect(() => {
    nuovaPartita();
  }, []);

  return (
    <div className="App">
      <Card className="mx-auto w-50 position-absolute top-50 start-50 translate-middle">
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
                <FormControl className="w-50 m-1 mx-auto"></FormControl>
                <Button className="w-50 m-1 mx-auto" onClick={tentativo}>
                  Invia
                </Button>
              </>
            )}
          </>
        )}
      </Card>
    </div>
  );
}

export default App;
