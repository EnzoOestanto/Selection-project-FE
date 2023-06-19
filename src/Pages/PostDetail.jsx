import { Toaster } from "react-hot-toast";
import Register from "../Components/Register/Register";
import { BsSearch } from "react-icons/bs";
import LeftSidebar from "../Components/LeftSideBar";
import NewPost from "../Components/Post/NewPost";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Allpost from "../Components/Post/AllPost";
import { Box } from "@mui/material";


const defaultTheme = createTheme(
    {
        palette: {
            primary: {
                main: "#009688"
            },
            secondary: {
                main: "#ffab40"
            }
        }
    }
);


export default function PostDetail() {
    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="md">
                    <Box sx={{ mt: 5, }}>
                        <Grid container spacing={2}>
                            <Grid item xs={4} >
                                <LeftSidebar />
                            </Grid>
                            <Grid item xs={7}>
                                <div className="sticky top-0 z-50 bg-white">
                                    <PostCard userIdPost={value.user_id} postId={value.id} text={value.text} image={value.image} username={value?.user?.username} date={value.updatedAt} profileImage={value.user?.image} />
                                </div>
                                <Allpost />
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    )
}
