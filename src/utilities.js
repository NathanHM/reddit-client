export const formatCharacters = text => {
    if (!text) {
        return text;
    } else {
        let str = text;
        str = str.replace('&gt;', '>');
        str = str.replace('&lt;', '<');
        str = str.replace('&amp;', '&');
        return str
    }
}

export const formatText = text => {

    if (!text) {
        return text;
    } else {
        const regex = /\(([^)]+)\)\[([^\]]+)\]/g;

        const formattedLink = text.replace(regex, (match, p1, p2) => {
            return (<a href={p2}>{p1}</a>);
        });

        return (
            <>
                {formattedLink}
            </>
        )
    }

}