import {Box, useMediaQuery} from "@mui/material";
import {useSelector} from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidgets from "scenes/widgets/MyPostWidgets";
import Posts_Widgets from "scenes/widgets/Posts_Widgets";
import FriendListWidgets from "scenes/widgets/FriendListWidgets";
import AdvertWidget from "scenes/widgets/AdvertWidgets";

const HomePage=()=>{
    const isNonMobileScreens =useMediaQuery("(min-width:1000px)");
    const {_id, picturePath}= useSelector((state)=>state.user);

    return (
        <Box>
            <Navbar/>
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                <UserWidget userId={_id} picturePath={picturePath} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                    >
                    <MyPostWidgets picturePath={picturePath}/>
                    <Posts_Widgets userId={_id}/>
                </Box>
                {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidgets userId={_id} />
          </Box>
        )}
            </Box>
        </Box>
    ) 
    
}

export default HomePage;