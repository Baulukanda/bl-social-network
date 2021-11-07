import { Link } from "@reach/router";
import { useState } from "react";
import AddQuote from "./AddQuote";

function Quotes(props) {
    let data = props.data;
    const { addComment } = props;
    const { countLikes } = props
    const [comment, setComment] = useState();

    return (
        <>
            <h1>List of Quotes</h1>
            <AddQuote AddQuote={props.addQuote} />
            <ul>
                {
                    data.map((quote) => {
                        return (
                            <li key={quote._id}>
                                <Link to={`/quote/${quote.id}`}>{quote.text}</Link>
                                <div>
                                    <p>Likes: {quote.likesCounter}</p>
                                    <button type="submit" onClick={(event) => {
                                        countLikes(quote._id)
                                    }}>Like</button>
                                </div>
                                {quote.comments.map((comment) => <p>{comment}</p>)}
                                <form >
                                    <label>
                                        Comment:
                                        <input onChange={(event) => setComment(event.target.value)} type="text" />
                                    </label>
                                    <input type="submit" onClick={(event) => { addComment(comment, quote.id) }} value="send" />
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