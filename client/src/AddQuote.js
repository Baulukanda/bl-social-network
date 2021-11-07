import { useState } from "react"

function AddQuote(props) {
    const { addQuote } = props;

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");

    return (
        <>
            <form >
                <label>
                    Quote:
                    <input onChange={(event) => setTitle(event.target.value)} type="text" />
                </label>
                <label>
                    who said it?:
                    <input onChange={(event) => setAuthor(event.target.value)} type="text" />
                </label>
                <input type="submit" onClick={(event) => {
                    addQuote(title, author);
                }} value="Add quote" />
            </form>

        </>
    );
}

export default AddQuote;
