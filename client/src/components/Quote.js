import { useState, useEffect } from "react";
const API_URL = process.env.REACT_APP_API;

function Quote(props) {

    const id = props.id;
    const [quote, setQuote] = useState([]);
    const { countLikes } = props
    const { addComment } = props
    const [comment, setComment] = useState();

    useEffect(() => {
        async function getQuoteData() {
            const id = props.id
            const url = `${API_URL}/quotes/${id}`;
            const response = await fetch(url);
            const data = await response.json();
            setQuote(data)
        }
        getQuoteData();
    }, []);

    return (
        <>
            <h3>Text: {quote.title}</h3>
            <p>Author: {quote.author}</p>

            <p>Likes: {quote.likesCounter}</p>
            <button type="submit" onClick={(event) => {
                countLikes(id)
            }}>Like</button>

            <label>
                Comment: {quote.comments}
                <input onChange={(event) => setComment(event.target.value)} type="text" /></label>
            <input type="submit" onClick={(event) => { addComment(comment, quote.id) }} value="send" />
        </>
    );
}

export default Quote;