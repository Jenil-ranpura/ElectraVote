import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Admin_dashboard = ({ party }) => {

  let nav = useNavigate();

  const [candidates, setCandidates] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");

  // Add candidate form
  const [addName, setAddName] = useState("");
  const [addState, setAddState] = useState("");

  // Fetch candidates for the given party
  useEffect(() => {
    if (!party) return;
    const fetchCandidates = async () => {
      try {
        const res = await axios.get("http://localhost:3000/admin/getCandidates", {
          params: { party },
        });
        setCandidates(res.data.response);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch candidates");
      }
    };
    fetchCandidates();
  }, [party]);

  // Handle updating candidate name
  const handleUpdate = async (candidate) => {
    if (!newName.trim()) return alert("Name cannot be empty");
    try {
      await axios.put("http://localhost:3000/admin/changeCandidate", {
        newCandidate: newName,
        partyname: candidate.partyname,
        state: candidate.state,
      });
      alert("Candidate name updated!");
      setCandidates((prev) =>
        prev.map((c) => (c._id === candidate._id ? { ...c, candidatename: newName } : c))
      );
      setEditingId(null);
      setNewName("");
    } catch (err) {
      console.error(err);
      alert("Failed to update candidate");
    }
  };

  // Handle deleting candidate
  const handleDelete = async (candidate) => {
    if (!window.confirm(`Are you sure you want to delete ${candidate.candidatename}?`)) return;
    try {
      await axios.delete("http://localhost:3000/admin/removeCandidate", {
        data: { partyname: candidate.partyname, state: candidate.state },
      });
      alert("Candidate deleted!");
      setCandidates((prev) => prev.filter((c) => c._id !== candidate._id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete candidate");
    }
  };

  // Handle adding candidate
  const handleAdd = async () => {
    if (!addName.trim() || !addState.trim()) return alert("All fields are required");
    try {
      const res = await axios.post("http://localhost:3000/admin/addCandidate", {
        candidatename: addName,
        partyname: party,
        state: addState,
      });
      alert("Candidate added!");
      setCandidates((prev) => [...prev, res.data.newCandidate]); // update local
      setAddName("");
      setAddState("");
    } catch (err) {
      console.error(err);
      alert("Failed to add candidate");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {/* Add Candidate Form */}
      <div className="mb-6 p-4 border rounded bg-gray-50">
        <h2 className="text-lg font-semibold mb-3">Add New Candidate</h2>
        <input
          type="text"
          placeholder="Candidate Name"
          value={addName}
          onChange={(e) => setAddName(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />

        {/* State Dropdown */}
        <select
          value={addState}
          onChange={(e) => setAddState(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        >
          <option value="">-- Select State --</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Rajasthan">Rajasthan</option>
          <option value="Madhya Pradesh">Madhya Pradesh</option>
          <option value="Delhi">Delhi</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
          <option value="Bihar">Bihar</option>
          <option value="Punjab">Punjab</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
        </select>

        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Candidate
        </button>
      </div>

      {candidates.length === 0 && <p>No candidates found.</p>}

      {candidates.map((candidate) => (
        <div
          key={candidate._id}
          className="flex items-center justify-between mb-3 p-3 border rounded"
        >
          <div className="flex-1">
            {editingId === candidate._id ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border p-1 rounded w-full"
              />
            ) : (
              <p className="font-semibold">{candidate.candidatename}</p>
            )}
            <p className="text-gray-500 text-sm">
              Party: <span className="font-medium">{candidate.partyname}</span>
            </p>
            <p className="text-gray-500 text-sm">
              State: <span className="font-medium">{candidate.state}</span>
            </p>
            <p className="text-gray-500 text-sm">
              Votes: <span className="font-medium">{(candidate.votecount).length}</span>
            </p>
          </div>

          <div className="flex space-x-2">
            {editingId === candidate._id ? (
              <>
                <button
                  onClick={() => handleUpdate(candidate)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditingId(null);
                    setNewName("");
                  }}
                  className="bg-gray-500 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setEditingId(candidate._id);
                    setNewName(candidate.candidatename);
                  }}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(candidate)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      ))}

      <div className="flex w-full items-center justify-center mt-6">
        <button className="text-white bg-black px-[35px] py-[10px] rounded-[20px] cursor-pointer font-bold" onClick={() => nav("/")}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Admin_dashboard;
