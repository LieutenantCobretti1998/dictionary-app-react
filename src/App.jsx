import Header from "./header/header.jsx";
import {useContext, useState} from "react";
import SearchResults from "./main/main.jsx"
import Loading from "./loading/loading.jsx";
import Error from "./error/error.jsx";
import {DataContext} from "./context/data_context.jsx";
import SavedWords from "./saved_words/saved_words.jsx";
function App() {
    const [apiResponse, setApiResponse] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [showSavedWords, setShowSavedWords] = useState(false);
    const {setData, savedWords, isWordSafe, deleteWord} = useContext(DataContext);

    const removeWord = (event, word) => {
        console.log(event);
        event.stopPropagation();
        if (isWordSafe.some(item => item.word === word)) {
            deleteWord(word);
            }
    }
    console.log("render app");
    const handleSearch = async (word) => {
        setLoading(true);
        setSuccess(false); // Reset success to false at start of new search
        setApiResponse(null); // Clear previous results at start of new search

        try {
            setError(false);
            setLoading(true);
            setShowSavedWords(false);
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setApiResponse(data);
            setSuccess(true);
        } catch (error) {
            setData(null);
            setError(true);
            setSuccess(false); // Explicitly handle error case for clarity
        } finally {
            setLoading(false);
        }
    };
    const handleToggle = () => {
        setShowSavedWords(!showSavedWords);
    }

  return (
        <>
          <Header onSearch={handleSearch} onToggle={handleToggle}/>
            {loading ? <Loading />: null}
            {showSavedWords ? <SavedWords savedWords={savedWords} onSearch={handleSearch} onDelete={removeWord} /> : (success && apiResponse ? <SearchResults apiResponse={apiResponse} onSearch={handleSearch} /> : null)}
            {error && !showSavedWords ? <Error/> : null}
        </>
  )
}

export default App
