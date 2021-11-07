import { Router } from "@reach/router";
import { useEffect, useState } from "react";
import Quote from "./Quote";
import Quotes from "./Quotes";
import AddQuote from "./AddQuote";
const API_URL = process.env.REACT_APP_API;



function App() {
  const [quotes, setQuote] = useState([]);

  // API GET all quotes
  function getQuote(id) {
    return quotes.find((quote) => quote._id === id);
  }

  /*
  // API POST second solution (doesent work)
  async function handleSubmit(event){
    event.preventDefault();
    try {
      const newQuote = {
        title: event.target.getElement.text.value,
        author: event.target.getElement.text.value
      };
      const response = await fetch(`${API_URL}/quotes`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuote)
      })
      const reply = await response.json();
      console.log(reply);

    } catch(error){
      this.setState({ error });
    };
  }
  */

  // API POST
  function addQuote(title, author) {
    console.log(title, author);

    const data = {
      title: title,
      author: author
    };
    const postData = async () => {
      const url = `${API_URL}/quotes`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const reply = await response.json();
      console.log(reply);
    };
    postData();
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
      <h1>List of Quotes</h1>
      <AddQuote path="/" addQuote={addQuote}></AddQuote>
      <Router>
        <Quotes path="/" data={quotes}></Quotes>
        <Quote path="/quote/:id" getQuote={getQuote}></Quote>
      </Router>
    </>
  );
}

export default App;
