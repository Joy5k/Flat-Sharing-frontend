import FeaturedSection from "@/components/UI/HomePage/Featured/Featured";
import HeroSection from "@/components/UI/HomePage/HeroSection/HeroSection";
import SearchField from "@/components/UI/HomePage/SearchBar/SearchBar";
import { Divider } from "@mui/material";
import AboutPage from "./about/page";
import RoomOrRoomMate from "@/components/UI/HomePage/RoomOrRoomMate/RoomOrRoomMate";
import FeaturedCart from "@/components/UI/HomePage/FeaturedCart/FeaturedCart";
import dynamic from 'next/dynamic';

const FindOutBanner = dynamic(
  () => import('@/components/UI/HomePage/findOutBanner/findOutBanner'),
  { ssr: false }
);
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
