import { NavBar } from "../components/NavBar";
import CompBuilder from "../components/CompBuilder";
import tftData from "../data/tftData.json";

export default function HomePage() {
  const { champions, traits } = tftData;

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-10">
      <NavBar />
      <div className="max-w-4xl mx-auto py-10">
        <h1 className="text-3xl font-bold mb-5">Create Your Comp</h1>
        <CompBuilder champions={champions} traits={traits} />
      </div>
    </div>
  );
}
