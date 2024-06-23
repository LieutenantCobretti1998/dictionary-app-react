import Header from "./header/header.jsx";
import {useState} from "react";
import SearchResults from "./main/main.jsx"
function App() {
    const [apiResponse, setApiResponse] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleSearch = async (word) => {
        setLoading(true);
        setSuccess(false); // Reset success to false at start of new search
        setApiResponse(null); // Clear previous results at start of new search

        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setApiResponse(data);
            setSuccess(true);
        } catch (error) {
            console.error(error);
            setSuccess(false); // Explicitly handle error case for clarity
        } finally {
            setLoading(false);
        }
    };

  return (
    <>
      <Header onSearch={handleSearch}/>
        {success && apiResponse ? <SearchResults apiResponse={apiResponse} /> : null}
      {/*<SearchResults apiResponse={apiResponse}/>*/}
    </>
  )
}

export default App
