import "./error.css";

export default function Error() {
    return (
        <div className="error-container">
            <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                <circle cx="184" cy="232" r="24" className="purple-fill"/>
                <path
                    className="purple-fill"
                    d="M256 288c45.42 0 83.62 29.53 95.71 69.83a8 8 0 01-7.87 10.17H168.15a8 8 0 01-7.82-10.17C172.32 317.53 210.53 288 256 288z"/>
                <circle cx="328" cy="232" r="24" className="purple-fill"/>
                <circle cx="256" cy="256" r="208" fill="none" stroke="currentColor" strokeMiterlimit="10"
                        strokeWidth="32" className="purple-stroke"/>
            </svg>
            <h3 className="h3">No definitions found</h3>
            <p className="error-text">
                Sorry pal, we couldn't find definitions for the word you were looking for.You can try the search again at later time or head to the web instead.
            </p>
        </div>
    )
}