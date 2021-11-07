import { Link } from "@reach/router";

function Quotes(props) {
    const { data } = props;
    return (
        <>
            <ul>
                {
                    data.map((quote) => {
                        return (
                            <li key={quote._id}>
                                <Link to={`/quote/${quote._id}`}>{quote.title}</Link>
                                <form >
                                    <label>
                                        Comment:
                                        <input />
                                    </label>
                                    <input type="submit" value="Submit" />
                                </form>
                            </li>
                        )
                    })
                }
            </ul><br/>
        </>
    )
}

export default Quotes;