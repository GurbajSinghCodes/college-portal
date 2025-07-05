import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaRegStar, FaStar } from "react-icons/fa";
import axios from "axios";
import backend from '../assets/backend.jsx';

const Folder = ({ name, contents, parentPath = "", starred, onStarToggle }) => {
    const [expanded, setExpanded] = useState(false);
    const currentPath = `${parentPath}/${name}`;

    const handleToggle = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="folder-wrapper">
            <div className="folder-header" onClick={handleToggle} >
                <span className="folder-icon">📁</span>
                <span className="folder-name">{name}</span>
                <span className="toggle-sign">{expanded ? "−" : "+"}</span>
            </div>
            {expanded && (
                <div className="folder-contents">
                    {Object.entries(contents).map(([key, value]) => {
                        const fullPath = `${currentPath}/${key}`;
                        const isStarred = starred.includes(fullPath);

                        return typeof value === "object" ? (
                            <Folder
                                key={key}
                                name={key}
                                contents={value}
                                parentPath={currentPath}
                                starred={starred}
                                onStarToggle={onStarToggle}
                            />
                        ) : (
                            <div key={key} className="file-card">
                                <img src="/svg/document.svg" alt="file" className="file-icon" />
                                <a
                                    href={`${backend}/notes${fullPath}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="file-link"

                                >
                                    {key}
                                </a>
                                <span
                                    className="star-toggle"
                                    onClick={() => onStarToggle(fullPath)}
                                    title={isStarred ? "Unstar" : "Star"}

                                >
                                    {isStarred ? <FaStar color="#6B21A8" /> : <FaRegStar />}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

const Qps = () => {
    const [files, setFiles] = useState({});
    const [starred, setStarred] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const res = await axios.get(`${backend}/getqps`);
                setFiles(res.data);
            } catch (error) {
                toast.error("Failed to fetch files")
            }
            const loginRes = await axios.get(`${backend}/loggedin`, {
                withCredentials: true,
            });

            if (loginRes.data?.success) {
                try {

                    const starredRes = await axios.get(`${backend}/api/starred-files`, {
                        withCredentials: true,
                    });
                    if (starredRes.data.success) {
                        setStarred(starredRes.data.starredFiles);
                    }
                }
                catch (error) {
                    toast.error("Failed to fetch starred files")
                }
            }

        };

        fetchFiles();
    }, []);

    const onStarToggle = async (filePath) => {
        try {
            // Check if user is logged in
            const loggedin = await axios.get(`${backend}/loggedin`, {
                withCredentials: true,
            });

            if (loggedin.data?.success) {
                const isAlreadyStarred = starred.includes(filePath);

                await axios.post(
                    `${backend}/api/toggle-star`,
                    {
                        filePath,
                        starred: !isAlreadyStarred,
                    },
                    { withCredentials: true }
                );

                // Update local starred state
                setStarred((prev) =>
                    isAlreadyStarred
                        ? prev.filter((f) => f !== filePath)
                        : [...prev, filePath]
                );
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error("You must log in first");
            } else {
                toast.error("Something went wrong");
                console.error("Star toggle error:", error);
            }
        }
    };


    return (
        <div id="notesmain">
            <div id="notesbgblur" className="full-page-blur"></div>
            <div id="noteshead">
                <p>PYQs B.Tech [CSE & AIML]</p>
            </div>
            <div id="notesbody">
                {Object.entries(files).map(([folderName, contents]) => (
                    <Folder
                        key={folderName}
                        name={folderName}
                        contents={contents}
                        parentPath=""
                        starred={starred}
                        onStarToggle={onStarToggle}
                    />
                ))}
            </div>
        </div>
    );
};

export default Qps;
