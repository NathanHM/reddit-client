const formatCharacters = text => {
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

const formatLinks = text => {

    if (!text) {
        return text;
    } else {
        const styledLinkRegex = /\[([^)]+)\]\(([^\]]+)\)/g;

        let formattedText = text.replace(styledLinkRegex, (match, p1, p2) => {
            return `<a href="${p2}" target='_blank'>${p1}</a>`;
        });

        const urlRegex = /(?<!href=")(https?:\/\/[^\s]+)/g;

        formattedText = formattedText.replace(urlRegex, (url) => {
            return `<a href="${url}" target='_blank'>${url}</a>`;
        });

        console.log(formattedText);

        return formatGifs(formattedText)
    }

}

const formatGifs = text => {
    if (!text) {
        return text;
    } else {

        const gifLinkRegex = /!<a href="giphy\|([^"]+)" target='_blank'>gif<\/a>/g;

        const formattedText = text.replace(gifLinkRegex, (match, gifId) => {
            const gifUrl = `https://media.giphy.com/media/${gifId}/giphy.gif`;
            return `<img src="${gifUrl}" alt="GIF" />`;
        });

        return formattedText;
    }
}

const format = text => formatGifs(formatLinks(formatCharacters(text)));

export default format;