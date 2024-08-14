import { formatText, formatCharacters } from "../../../utilities"

export default function Text({ data }) {
    return (
        <p>{formatText(formatCharacters(data.selftext))}</p>
    )
}