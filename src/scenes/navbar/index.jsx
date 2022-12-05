import {useState} from 'react';
import {Box, IconButton, InputBase,
Typography, Select, MenuItem,
FormControl, useTheme,
useMediaQuery} from "@mui/material";
import {Search, Message,Notifications, 
DarkMode, LightMode, Help,
Menu, Close} from '@mui/icons-material';
import { useDispatch,useSelector } from 'react-redux';
import {setMode, setLogout} from 'state';
import FlexBetween from "components/FlexBetween";
import {useNavigate} from 'react-router-dom';


const Navbar=()=>{
    const [isMobileMenuToggle, setIsMobileMenuToggle] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) =>state.user);
    const isNonMobileScreens = useMediaQuery("(min-width : 1000px)");

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    const fullName = `${user.firstName} ${user.lastName} `


    return (
        <FlexBetween padding="1rem 6%" background={alt}> 
            <FlexBetween gap="1.75rem">
                <Typography fontWeight="bold"
                fontSize ="clamp(1rem, 2rem, 2.25rem)"
                color="primary"
                onClick={()=>navigate("/home")}
                sx={{
                    "&:hover":{
                      color: primaryLight,
                      cursor:"pointer"  
                    },
                }}>
                    Sociopedia
                </Typography>
                {isNonMobileScreens && (
                    <FlexBetween  backgroundColor={neutralLight} 
                    borderRadius ="9px" gap="3rem" padding="0.1rem 1.5rem">
                        <InputBase placeHolder="Search..."/>
                        <IconButton>
                            <Search/>
                        </IconButton>
                    </FlexBetween>
                )}
            </FlexBetween>
            {/*DESKTOP NAV */}
            {isNonMobileScreens ?
            (<FlexBetween gap="2rem">
                <IconButton onClick={()=> dispatch(setMode())}>
                    {theme.palette.mode ==='dark' ? (
                        <DarkMode sx={{fontSize: "25px"}}/>
                    ):(
                        <LightMode sx={{color: dark, fontSize: "25px" }}/>
                    )}
                </IconButton>
                <Message sx={{fontSize: "25px"}}/>
                <Notifications sx={{fontSize: "25px"}}/>
                <Help sx={{fontSize: "25px"}}/>
                <FormControl variant="standard" value={fullName} >
                    <Select value={fullName} sx={{
                        fontSize: "25px",
                        backgroundColor: neutralLight,
                        width:"150px",
                        borderRadius:"0.25rem",
                        "& .MuiSvgIcon-root":{
                            pr:"0.25rem",
                            width:"3rem"

                        },
                        "& .MuiSelect-select:focus:":{
                            backgroundColor: neutralLight

                        },

                        }}
                        input={<InputBase/>}
                        >
                            <MenuItem value={fullName}>
                                <Typography> {fullName}</Typography>
                            </MenuItem>
                            <MenuItem onClick={()=>dispatch(setLogout())}>Log Out</MenuItem>
                    </Select>
                </FormControl>
            </FlexBetween>)
            :
            (<IconButton
            onCLick={()=>setIsMobileMenuToggle(!isMobileMenuToggle)}>
                <Menu/>
            </IconButton>
            )}
            {/*Mobile NAV */}
            {!isNonMobileScreens && isMobileMenuToggle && (
                <Box
                postion ="fixed"
                right="0"
                botton="0"
                height="0"
                zIndex="10"
                maxWidth="500px"
                minWidth="300px"
                backgroundColor={background}
                >
                    {/*Close Icon  */}
                    <Box display="flex" justifyContent="flex-end"p="1rem">
                    <IconButton
                         onCLick={()=>setIsMobileMenuToggle(!isMobileMenuToggle)}>
                      
                    </IconButton>
                    </Box>
                    {/*Menu Items */}
                </Box>
            )}
        </FlexBetween>

    )
};

export default Navbar;