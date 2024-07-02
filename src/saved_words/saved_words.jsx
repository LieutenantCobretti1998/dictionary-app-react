import "./saved_words.css";
export default function SavedWords({savedWords, onSearch}) {
    const words = savedWords();
    return (
        <div className="saved-words">
        <h2 className="saved-words__title">Saved Words</h2>
        <ul className="list">
            {words.map((word, i) => (
                <li onClick={() => onSearch(word)} key={i}>{word}</li>
            ))}
        </ul>
        </div>
    )
}