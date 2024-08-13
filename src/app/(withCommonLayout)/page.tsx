import FeaturedSection from "@/components/UI/HomePage/Featured/Featured";
import HeroSection from "@/components/UI/HomePage/HeroSection/HeroSection";
import SearchField from "@/components/UI/HomePage/SearchBar/SearchBar";
import { Divider } from "@mui/material";
import AboutPage from "./about/page";
import FindOutBanner from "@/components/UI/HomePage/findOutBanner/findOutBanner";
import RoomOrRoomMate from "@/components/UI/HomePage/RoomOrRoomMate/RoomOrRoomMate";
import FeaturedCart from "@/components/UI/HomePage/FeaturedCart/FeaturedCart";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <FeaturedSection />
      <FindOutBanner/>
      <SearchField />
      <Divider>Spare Room</Divider>
      <AboutPage></AboutPage>
      <RoomOrRoomMate></RoomOrRoomMate>
      <FeaturedCart></FeaturedCart>
    
    </>
  );
};

export default HomePage;
