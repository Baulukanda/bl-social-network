import { Link } from "@reach/router";
import { useState } from "react";
import AddQuote from "./AddQuote";

function Quotes(props) {
    const { data, addComment, countLikes } = props;
    const [comment, setComment] = useState();

    return (
        <>
            <h1>List of Quotes</h1>
            <AddQuote addQuote={props.addQuote}></AddQuote>
            <ul>
                {
                    data.map((quote) => {
                        return (
                            <li key={quote._id}>
                                <Link to={`/quote/${quote.id}`}>{quote.text}</Link>
                                <div>
                                    <p>Likes: {quote.likes}  <button type="submit" onClick={(event) => {
                                        countLikes(quote._id)
                                    }}>Like</button></p>
                                </div>
                                <p>Comments: {quote.comments}</p>
                                <form >
                                    <label>
                                        Add comment:
                                        <input onChange={(event) => setComment(event.target.value)} type="text" />
                                    </label>
                                    <button type="submit" onClick={(event) => { addComment(quote.id, comment) }}>Add</button>
                                </form>
                            </li>
                        )
                    })
                }
            </ul><br />
        </>
    )
}

export default Quotes;