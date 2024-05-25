import FeaturedSection from "@/components/UI/HomePage/Featured/Featured";
import HeroSection from "@/components/UI/HomePage/HeroSection/HeroSection";
import HowItWorks from "@/components/UI/HomePage/HowItWorks/HowItWorks";
import SearchField from "@/components/UI/HomePage/SearchBar/SearchBar";
import Stats from "@/components/UI/HomePage/Stats/Stats";
import TopRatedDoctors from "@/components/UI/HomePage/TopRatedDoctors/TopRatedDoctors";
import WhyUs from "@/components/UI/HomePage/WhyUs/WhyUs";
import { Divider } from "@mui/material";
import AboutPage from "./about/page";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <FeaturedSection />
      <SearchField />
      <Divider>Spare Room</Divider>
      <AboutPage></AboutPage>
    
    </>
  );
};

export default HomePage;
