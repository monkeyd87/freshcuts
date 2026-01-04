
import { Nav } from "@/components/Nav"; 
import { Hero } from "@/components/Hero";
import { HeroAI } from "@/components/HeroAI";
import { Join } from "@/components/Join";
import { Pricing } from "@/components/pricing";
export default function Home() {
  return (
   <>
      {/* <Nav></Nav> */}
      <Hero/>
      <HeroAI/>
      <Join/>
      <Pricing/>
   </>
  
  );
}
