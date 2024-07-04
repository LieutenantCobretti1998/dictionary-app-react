import "./search_results.css";
import {useContext, useEffect, useRef} from "react";
import {DataContext} from "../context/data_context.jsx";


// eslint-disable-next-line react/prop-types
export default function SearchResults({apiResponse, onSearch}) {
    const {setData} = useContext(DataContext);
    console.log("render main");
    const audioRef = useRef(null);
    const entry = apiResponse[0];
    let meanings;
    meanings = apiResponse.flatMap(entry => entry.meanings || []);
    // Define helper functions to check if properties exist
    const isText = property => property.text;
    const isAudio = property => property.audio && property.audio.trim() !== "";
    const isLink = url => url && url.trim !== "";

    // Use find to get the object and then access the wiki source property
    let sourceUrl;
    sourceUrl = apiResponse.flatMap(entry => entry.sourceUrls || []).find(isLink) || "#";

    // Use find to get the object and then access the text property
    let textPhonetic;
    textPhonetic = apiResponse.flatMap(entry => entry.phonetics || []).find(isText)?.text || "";

    // Use find to get the object and then access the audio property
    let audioUrl;
    audioUrl = apiResponse.flatMap(entry => entry.phonetics || []).find(isAudio)?.audio;

    useEffect(() => {
        let localData = new Object();
        localData.word = entry.word;
        localData.pronunciation = textPhonetic;
        localData.meanings = meanings;
        localData.url = sourceUrl;
        setData(localData);
    }, [apiResponse]);

    return (
        <main className="main">
            <section className="main__searchWord">
                <div>
                    <h1 className="main__searchWord__heading">{entry.word}</h1>
                    <p className="main__searchWord__prononciation">{textPhonetic}</p>
                </div>
                {audioUrl && (
                    <>
                        <audio ref={audioRef} src={audioUrl} preload="auto"/>
                        <svg onClick={() => audioRef.current?.play()} xmlns="http://www.w3.org/2000/svg" width="75" height="75"
                             viewBox="0 0 75 75">
                            <g fill="#A445ED" fillRule="evenodd">
                                <circle cx="37.5" cy="37.5" r="37.5" opacity=".25"/>
                                <path d="M29 27v21l21-10.5z"/>
                            </g>
                        </svg>
                    </>
                )}
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
                                            <p onClick={() => onSearch(synonym)} key={index}>{synonym}</p>
                                        ))}
                                    </div>
                                )}
                                {element.antonyms && element.antonyms.length > 0 && (
                                    <div className="main__description__container__meaning__synonyms">
                                        <h4>
                                            Antonyms
                                        </h4>
                                        {element.antonyms.map((antonym, index) => (
                                            <p onClick={() => onSearch(antonym)} key={index}>{antonym}</p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    <div className="main__description__line"></div>
                    <div className="main__description__source">
                        {sourceUrl && (
                                <>
                                    <h4>Source</h4>
                                    <a href={sourceUrl}>{sourceUrl}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                                            <path fill="none" stroke="#838383" strokeLinecap="round" strokeLinejoin="round"
                                                  strokeWidth="1.5"
                                                  d="M6.09 3.545H2.456A1.455 1.455 0 0 0 1 5v6.545A1.455 1.455 0 0 0 2.455 13H9a1.455 1.455 0 0 0 1.455-1.455V7.91m-5.091.727 7.272-7.272m0 0H9m3.636 0V5"/>
                                        </svg>
                                    </a>
                                </>
                            )}
                    </div>
                </div>
            </section>
        </main>
    )
}