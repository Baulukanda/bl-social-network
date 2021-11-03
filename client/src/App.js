import { Router } from "@reach/router";
import { useEffect, useState } from "react";
import Quote from "./Quote";
import Quotes from "./Quotes";
const API_URL = process.env.REACT_APP_API;



function App() {
  const [quotes, setQuote] = useState([]);

  function getQuote(id) {
    return quotes.find((quote) => quote._id === id);
  }

  useEffect(() => {
    async function getData() {
      const url = `${API_URL}/quotes`;
      const response = await fetch(url);
      const data = await response.json();
      setQuote(data)
    }
    getData();
  }, []);

  return (
    <>
      <h1>MERN App!</h1>
      <p>Data from server:</p>
      <Router>
          <Quotes path="/" data={quotes}></Quotes>
          <Quote path="/quote/:id" getQuote={getQuote}></Quote>
      </Router>
      
    </>
  );
}

export default App;
