import { useState, useEffect } from "react";
import Fuse from "fuse.js";
import axios from "axios";
import { Link } from "react-router-dom";
import backend from "../assets/backend";
import { Search } from "lucide-react";
function search() {
    const [query, setQuery] = useState("");
    const [fuse, setFuse] = useState(null);
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.post(`${backend}/get-search`);

                const combinedData = res.data

                const options = {
                    keys: ["question", "path"],
                    includeScore: true,
                    threshold: 0.4
                };

                setFuse(new Fuse(combinedData, options));
            } catch (err) {
                console.error("Error fetching search data:", err);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (fuse && query.trim()) {
            const searchResults = fuse.search(query.trim());
            setResults(searchResults);
        } else {
            setResults([]);
        }
    }, [query, fuse]);

    return (
        <div className="search">
            <div className="inputWrapper">
                <Search id="searchIcon" className="inputIcon" />
                <input
                    id="searchInput"
                    className="inputs"
                    type="text"
                    placeholder="Search files..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            <ul>
                {results.map(({ item }) => (

                    <li key={item.path}>
                        <a target="_blank" href={backend + item.path.replace(/^\/(notes|qps)/, "/resources")}>
                            {item.name}
                            {item.path.includes("notes") ? " (Notes) " : " (Question paper) "}
                            <span>
                                {backend + item.path.replace(/^\/(notes|qps)/, "/resources")}
                            </span></a>

                    </li>
                ))}
            </ul>
        </div>
    );
}

export default search;
