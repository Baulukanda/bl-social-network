import { useEffect, useState } from "react";
const API_URL = process.env.REACT_APP_API;

function Quote(props) {
  const [quote, setQuote] = useState([]);

  useEffect(() => {
    async function getQuoteData() {
      const id = props._id
      const url = `${API_URL}/quotes/${id}`;
      const response = await fetch(url);
      const data = await response.json();
      setQuote(data)
    }
    getQuoteData();
  }, [props._id]);

  return (
    <>
      <h3>Text: {quote?.text}</h3>
      <p>Author: {quote?.author}</p>
      <p>Likes: {quote?.likes}</p>
      <p>Comments: {quote?.comments}</p>
    </>
  );
}

export default Quote;