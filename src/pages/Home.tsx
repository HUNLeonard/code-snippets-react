import { CategoryShowCase } from "../components/home/CategoryShowCase";
import HeroSection from "../components/home/HeroSection";
import RecentCodeShowCase from "../components/home/RecentCodeShowCase";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CategoryShowCase />
      <RecentCodeShowCase />
    </main>
  )
}
