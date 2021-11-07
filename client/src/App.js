import { Router } from "@reach/router";
import { useEffect, useState } from "react";
import Quote from "./components/Quote";
import Quotes from "./components/Quotes";
const API_URL = process.env.REACT_APP_API;



function App() {
  const [quotes, setQuote] = useState([]);

  // API POST for adquote
  function addQuote(text, author) {
    if (text.length <= 500) {
      const newQuote = {
        method: 'PUT',
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
      body: JSON.stringify()
    };
    const postIndex = quotes.findIndex(post => post._id === id)
    fetch(`${API_URL}/quotes/${id}/comment`, countLikes)
      .then(response => response.json())
      .then(counteLikes => setQuote([...quotes.slice(0, postIndex), counteLikes, ...quotes.slice(postIndex + 1)]));
  };

  // API PUT for adding comments
  function addComment(comment, id) {
    const newComment = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "comments": comment })
    };
    const postIndex = quotes.findIndex(post => post._id === id)
    fetch(`${API_URL}/quotes/${id}/comment`, newComment)
      .then(response => response.json())
      .then(createdComment => setQuote([...quotes.slice(0, postIndex), createdComment, ...quotes.slice(postIndex + 1)]));
  }
  useEffect(() => {
    async function getQuoteData() {
      const url = `${API_URL}/quotes`;
      const response = await fetch(url);
      const data = await response.json();
      setQuote(data)
    }
    getQuoteData();
  }, []);

  return (
    <>

      <Router>
        <Quotes path="/" data={quotes} addQuote={addQuote} addComment={addComment} countLikes={countLikes}></Quotes>
        <Quote path="/quote/:id" addComment={addComment} countLikes={countLikes}></Quote>
      </Router>
    </>
  );
}

export default App;
