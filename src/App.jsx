import Header from "./header/header.jsx";
import {useContext, useState} from "react";
import SearchResults from "./main/main.jsx"
import Loading from "./loading/loading.jsx";
import Error from "./error/error.jsx";
import {DataContext} from "./context/data_context.jsx";
function App() {
    const [apiResponse, setApiResponse] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const {setData} = useContext(DataContext);
    const handleSearch = async (word) => {
        setLoading(true);
        setSuccess(false); // Reset success to false at start of new search
        setApiResponse(null); // Clear previous results at start of new search

        try {
            setError(false);
            setLoading(true);
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

  return (
        <>
          <Header onSearch={handleSearch}/>
            {loading ? <Loading />: null}
            {success && apiResponse ? <SearchResults apiResponse={apiResponse} /> : null}
            {error ? <Error/> : null}
        </>
  )
}

export default App
