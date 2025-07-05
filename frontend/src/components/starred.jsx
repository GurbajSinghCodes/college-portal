import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import backend from "../assets/backend.jsx";

const StarredFiles = () => {
    const [starredFiles, setStarredFiles] = useState([]);

    useEffect(() => {
        const fetchStarredFiles = async () => {
            try {
                const res = await axios.get(`${backend}/api/starred-files`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    setStarredFiles(res.data.starredFiles);
                } else {
                    toast.error("Could not fetch starred files.");
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    toast.error("Please log in to see starred files.");
                } else {
                    toast.error("Error fetching starred files.");
                    console.error("Starred fetch error:", error);
                }
            }
        };

        fetchStarredFiles();
    }, []);

    const handleUnstar = async (filePath) => {
        try {
            await axios.post(`${backend}/api/toggle-star`, {
                filePath,
                starred: false,
            }, { withCredentials: true });

            setStarredFiles(prev => prev.filter(path => path !== filePath));
            toast.success("File unstarred.");
        } catch (error) {
            toast.error("Failed to unstar file.");
            console.error("Unstar error:", error);
        }
    };

    return (
        <div className="starredmain">
            <h2>
                <FaStar className="star" color="#6B21A8" />
                Your Starred Files
            </h2>
            {starredFiles.length === 0 ? (
                <div id="starredempty">Any files you star will appear here 😄</div>
            ) : (
                <div className="folder-contents">
                    {starredFiles.map((path, index) => {
                        const fileName = path.split("/").pop();

                        return (
                            <div className="file-card" key={index}>

                                <a
                                    href={`${backend}/resources${path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className='file-link'
                                >
                                    <img src="/svg/document.svg" alt="file" className="file-icon" />
                                    {fileName}
                                </a>
                                <span
                                    className="star-toggle"
                                    onClick={() => handleUnstar(path)}
                                    style={{ cursor: "pointer", marginLeft: "10px" }}
                                >
                                    <FaStar color="#6B21A8" />
                                </span>
                            </div>
                        );
                    })}
                </div>
            )
            }
        </div >
    );
};

export default StarredFiles;
