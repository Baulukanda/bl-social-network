function Quote(props) {
    const { id, getQuote } = props;
    const quote = getQuote(id);

    return (
        <>
            <h3>Title: {quote?.title}</h3>
            <p>Author: {quote?.author}</p>
        </>
    );
}

export default Quote;