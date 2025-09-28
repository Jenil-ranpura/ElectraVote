import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // npm install framer-motion
import axios from "axios";
import { getToken } from "./jwt/jwtauth.js";

const images = {
    bjp: "https://upload.wikimedia.org/wikipedia/hi/e/ec/Bharatiya_Janata_Party_logo.svg.png",
    congress: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Indian_National_Congress_hand_logo.svg/1200px-Indian_National_Congress_hand_logo.svg.png",
    aap: "https://i.ndtvimg.com/i/2015-04/aap-logo-650_650x400_41428497829.jpg",
};

export default function Home() {
    const [votedCandidate, setVotedCandidate] = useState(null);
    const [loading, setLoading] = useState(false);
    let [candidates, setCandidates] = useState([]);

    let fetchCandidates = async () => {
        let token = getToken();
 
        let res = await axios.get("http://localhost:3000/candidate", {
            headers: { Authorization: `Bearer ${token}` }
        });

        setVotedCandidate(res.data.voted);
        setCandidates(res.data.candidate);
    }

    useEffect(() => {
        fetchCandidates();
    }, []);

    const handleVote = async (candidate) => {
        if (votedCandidate) return; // already voted

        if (window.confirm(`Are you sure you want to vote for ${candidate.candidatename}?`)) {
            setLoading(true);

            // fake delay to simulate submitting
            setTimeout(() => {
                setVotedCandidate(candidate.partyname);
                setLoading(false);
            }, 1000);

            let token = getToken();

            let res = await axios.post("http://localhost:3000/user/vote", 
                {party: candidate.partyname},
                {headers: {Authorization: `Bearer ${token}`}}
            )

            console.log(res.data.response);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center py-10">
            <h1 className="text-4xl font-extrabold mb-10 text-gray-800">
                🗳️ Cast Your Vote
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-11/12 max-w-6xl">
                {candidates.map((c, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center transition"
                    >
                        <img
                            src={images[c.partyname]}
                            alt={c.candidatename}
                            className="w-24 h-24 rounded-full mb-4 border-4 border-purple-200"
                        />
                        <h2 className="text-2xl font-semibold">{c.candidatename}</h2>
                        <p className="text-gray-600 mb-4">{c.partyname}</p>
                        <button
                            className={`mt-2 w-full px-5 py-2 rounded-xl font-bold text-white transition ${votedCandidate === c.partyname
                                ? "bg-green-500 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                                }`}
                            onClick={() => handleVote(c)}
                            disabled={!!votedCandidate || loading}
                        >
                            {votedCandidate === c.partyname
                                ? "✅ Voted"
                                : loading
                                    ? "Submitting..."
                                    : "Vote"}
                        </button>
                    </motion.div>
                ))}
            </div>

            {votedCandidate && (
                <p className="mt-8 text-xl font-medium text-green-700">
                    🎉 You voted for <span className="font-bold">{votedCandidate}</span>.
                </p>
            )}
        </div>
    );
}
