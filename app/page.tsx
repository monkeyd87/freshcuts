
import { NavBar } from "@/components/Nav"; 
import { Hero } from "@/components/Hero";
import { HeroAI } from "@/components/HeroAI";
import { Join } from "@/components/Join";
import { Pricing } from "@/components/pricing";
import Footer  from "@/components/Footer"
import { navItems } from "@/data";
export default function Home() {
  return (
   <>
    <NavBar navItems={navItems}/>
      <Hero/>
      <HeroAI/>
      <Join/>
      <Pricing/>
      <Footer/>
   </>
  
  );
}
