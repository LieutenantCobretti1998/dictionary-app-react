import "./search_results.css";
import {useRef} from "react";


// eslint-disable-next-line react/prop-types
export default function SearchResults({apiResponse}) {
    if (apiResponse) {
        console.log(apiResponse);
    }

    const entry = apiResponse[0];
    const meanings = entry.meanings;
    const audioRef = useRef(null);
    // Define helper functions to check if properties exist
    const isText = property => property.text;
    const isAudio = property => property.audio;

    // Use find to get the object and then access the text property
    let textPhonetic = entry.phonetics && Array.isArray(entry.phonetics) ?
        // eslint-disable-next-line react/prop-types
        entry.phonetics.find(isText) : null;
    textPhonetic = textPhonetic ? textPhonetic.text : 'No pronunciation available';

    // Use find to get the object and then access the audio property
    let audioUrl = entry.phonetics && Array.isArray(entry.phonetics) ?
        entry.phonetics.find(isAudio) : null;
    audioUrl = audioUrl ? audioUrl.audio : '';

    const playAudio = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    }

    return (
        <main className="main">
            <section className="main__searchWord">
                <div>
                    <h1 className="main__searchWord__heading">{entry.word}</h1>
                    <p className="main__searchWord__prononciation">{textPhonetic}</p>
                </div>
                <audio ref={audioRef} src={audioUrl} preload="auto" />
                <svg onClick={playAudio} xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75">
                    <g fill="#A445ED" fillRule="evenodd">
                        <circle cx="37.5" cy="37.5" r="37.5" opacity=".25"/>
                        <path d="M29 27v21l21-10.5z"/>
                    </g>
                </svg>

            </section>
            <section className="main__description">
                <div className="main__description__container">
                    {meanings.map((element, index) => (
                        <div key={index} className="main__description__container__meaning">
                            <div className="main__description__container__meaning__header">
                                <h3 className="main__description__header">{element.partOfSpeech}</h3>
                                <div className="main__description__line"></div>
                            </div>
                            <div className="main__description__container__meaning__explanation">
                                <h3 className="main__description__container__meaning__explanation__meaning">Meaning</h3>
                                <ol className="main__description__container__meaning__explanation__examples">
                                    {element.definitions.map((entry, defIndex) => (
                                        <li key={defIndex}>{entry.definition}</li>
                                    ))}
                                </ol>
                                {element.synonyms && element.synonyms.length > 0 && (
                                    <div className="main__description__container__meaning__synonyms">
                                        <h4>
                                            Synonyms
                                        </h4>
                                        {element.synonyms.map((synonym, index) => (
                                            <p key={index}>{synonym}</p>
                                        ))}
                                    </div>
                                )}
                                {element.antonyms && element.antonyms.length > 0 && (
                                    <div className="main__description__container__meaning__synonyms">
                                        <h4>
                                            Antonyms
                                        </h4>
                                        {element.antonyms.map((antonym, index) => (
                                            <p key={index}>{antonym}</p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    <div className="main__description__line"></div>
                    <div className="main__description__source">
                        <h4>Source</h4>
                        <a href={entry.sourceUrls[0]}>{entry.sourceUrls[0]}
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                                <path fill="none" stroke="#838383" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="1.5"
                                      d="M6.09 3.545H2.456A1.455 1.455 0 0 0 1 5v6.545A1.455 1.455 0 0 0 2.455 13H9a1.455 1.455 0 0 0 1.455-1.455V7.91m-5.091.727 7.272-7.272m0 0H9m3.636 0V5"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    )
}