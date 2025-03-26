import { useState, useEffect } from "react";

export const Diary = () => {
  const [title, setTitle] = useState("");
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
    setEntries(savedEntries);
  }, []);

  const saveEntry = () => {
    if (!title || !entry) return;
    const newEntry = { title, entry, date: new Date().toLocaleString() };
    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem("diaryEntries", JSON.stringify(updatedEntries));
    setTitle("");
    setEntry("");
  };

  return (
    <div className="flex flex-grow mx-auto">
      <div className="flex flex-col px-4 border-r-1 border-grey-100 w-[50%]">
        <h2 className="text-xl font-semibold mb-4">New note</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-lg mb-2"
        />
        <textarea
          placeholder="Write your note..."
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          className="w-full p-2 border rounded-lg mb-2 h-32"
        ></textarea>
        <button
          onClick={saveEntry}
          className="bg-gray-500 text-white py-2 px-4 rounded-lg"
        >
          Save note
        </button>
      </div>
      <div className="flex flex-col px-4 w-[50%]">
        <h3 className="text-xl font-semibold">Previous Entries</h3>
        <ul className="mt-2">
          {entries.map((e, index) => (
            <li key={index} className="p-2 border-b">
              <strong>{e.title}</strong> ({e.date})<p>{e.entry}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Diary;
