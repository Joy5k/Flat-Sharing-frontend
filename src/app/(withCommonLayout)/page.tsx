import FeaturedSection from "@/components/UI/HomePage/Featured/Featured";
import HeroSection from "@/components/UI/HomePage/HeroSection/HeroSection";
import SearchField from "@/components/UI/HomePage/SearchBar/SearchBar";
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
