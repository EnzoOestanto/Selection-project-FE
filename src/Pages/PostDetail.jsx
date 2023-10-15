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
import { getSinglePostAPI } from "../API/postAPI";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PostCard from "../Components/Post/PostCard";


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
  const [params] = useSearchParams()
  console.log(params.get('postId'))
  const [dataRes, setDataRes] = useState()
  const postId = params?.get('postId')
  const getPost = async () => {
    try {
      console.log('masuk get post')
      const response = await getSinglePostAPI(postId)
      console.log('getpost', response)
      console.log('image', response.data.data)

      if (response) {
        setDataRes(response.data)
      }

    } catch (error) {

    }
  }

  useEffect(() => {
    getPost()

  }, [])
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
                {console.log('data', dataRes)}

                <PostCard userIdPost={dataRes?.data.user_id} postId={dataRes?.data.id} text={dataRes?.data.text} image={dataRes?.data?.image} username={dataRes?.data?.user?.username} date={dataRes?.data.updatedAt} profileImage={dataRes?.data?.user?.image} />


              </Grid>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  )
}
