import Api from "@/lib/api";
import Agent from "@/types/Agent";
import { SearchData } from "@/types/Search";
import AgentCardSimple from "./AgentCardSimple";

async function getReviews() {
  const res = await new Api().get("search?page_size=3&default=true");
  return res.json();
}
export default async function LandingReviews() {
  const reviews: SearchData<Agent> = await getReviews();
  return (
    <div className="vertical-rhythm">
      {reviews.data.map((agent) => (
        <AgentCardSimple key={agent.id} agent={agent} />
      ))}
    </div>
  );
}
