import New3 from "./Styles/New3";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">About VotingApp</h1>
      <New3 text="VotingApp is a secure and easy-to-use online platform designed to make
        the voting process simple transparent and reliable Our mission is to
        ensure that every vote counts and that the democratic process is more
        accessible to everyone" />
      <New3 text="With VotingApp, users can register, cast their votes, and track results
        in real-time. Administrators get a dedicated panel to manage elections,
        monitor participation, and ensure fairness throughout the process." />
    </div>
  );
}
