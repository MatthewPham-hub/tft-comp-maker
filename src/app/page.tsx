import fs from "fs";
import path from "path";
import { NavBar } from "../components/NavBar";
import CompBuilder from "../components/CompBuilder";

async function getChampions() {
  const filePath = path.join(process.cwd(), "src", "data", "tftData.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(fileContents);
  return data.champions;
}

export default async function HomePage() {
  const champions = await getChampions();

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-10">
      <NavBar />
      <div className="max-w-4xl mx-auto py-10">
        <h1 className="text-3xl font-bold mb-5">Create Your Comp</h1>
        <CompBuilder champions={champions} />
      </div>
    </div>
  );
}
