import { Router } from "@reach/router";
import { useEffect, useState } from "react";
import Quote from "./components/Quote";
import Quotes from "./components/Quotes";
const API_URL = process.env.REACT_APP_API;

function App() {
  const [quotes, setQuote] = useState([]);

  useEffect(() => {
    async function getData() {
      const url = `${API_URL}/quotes`;
      const response = await fetch(url);
      const data = await response.json();
      setQuote(data);
    }
    getData();
  }, []);

  
  function getQuote(id) {
    return quotes.find((quote) => quote.id === parseInt(id));;
  }


  // API POST for addQuote
  function addQuote(text, author) {
    if (text.length <= 500) {
      const newQuote = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "text": text, "author": author }),
      };
      fetch(`${API_URL}/quotes`, newQuote)
        .then(response => response.json())
        .then(createdQuote => setQuote([...quotes, createdQuote]));
    }
  }

  // API PUT for adding likes
  function countLikes(id) {
    const countLikes = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(),
    };
    const postIndex = quotes.findIndex((post) => post._id === id);
    fetch(`${API_URL}/quotes/${id}/like`, countLikes)
      .then((response) => response.json())
      .then((counteLikes) =>
        setQuote([
          ...quotes.slice(0, postIndex),
          counteLikes,
          ...quotes.slice(postIndex + 1),
        ])
      );
  }

  // API PUT for adding comments
  function addComment(id, comment) {
    const newComment = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'comments': comment }),
    };
    const postIndex = quotes.findIndex((post) => post._id === id);
    fetch(`${API_URL}/quotes/${id}/comments`, newComment)
      .then((response) => response.json())
      .then((createdComment) =>
        setQuote([
          ...quotes.slice(0, postIndex),
          createdComment,
          ...quotes.slice(postIndex + 1),
        ])
      );
  }

  return (
    <>
      <Router>
        <Quotes path="/" data={quotes} addQuote={addQuote} countLikes={countLikes} addComment={addComment} />
        <Quote path="/quote/:id" />
      </Router>
    </>
  );
}

export default App;
