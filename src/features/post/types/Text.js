import format from "../../../utilities"

export default function Text({ data }) {
    return (
        <div dangerouslySetInnerHTML={{ __html: format(data.selftext) }} />
    )
}