import * as React from 'react';
import { Box, Grid, Typography } from "@mui/material"
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { getAllPostAPI } from "../../API/postAPI";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import PostCard from './PostCard';



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

export default function Allpost() {
  const [disable, setDisable] = React.useState(false)
  const [timeline, setTimeline] = React.useState([])
  const [page, setPage] = React.useState(1)
  const limit = 1
  const navigate = useNavigate()
  const observer = React.useRef()
  const [hasMore, setHasMore] = React.useState(false)
  const lastPost = React.useCallback(n => {
    if (observer.current) { observer.current.disconnect() }
    observer.current = new IntersectionObserver(entries => {
      console.log('hasmore', hasMore)
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPageNumber => prevPageNumber + 1)
      }
    })
    console.log(n)
    if (n) observer.current.observe(n)

  })
  const getAll = async () => {
    try {
      let response = await getAllPostAPI(page, limit)
      console.log('page>>>>', page, response?.data?.totalPage)

      setHasMore(page < Number(response?.data?.totalPage))

      console.log('getall', response)
      setTimeline(prevTimeline => {
        return [...prevTimeline, ...response?.data?.data]
      })
      // setTimeline(response?.data?.data)

    } catch (error) {

    }
  }
  React.useEffect(() => {
    getAll()
    // console.log(page)
  }, [page])
  return (
    <ThemeProvider theme={defaultTheme}>
      <Toaster />
      <Container component="main" maxWidth="md">
        <Box sx={{ mt: 3, mb: 3 }}>

          {/* <Grid  spacing={0}> */}
          {
            timeline?.map((value, index) => {
              if (timeline.length === index + 1) {
                return (
                  <div ref={lastPost} key={`${value}1${index}`}>
                    <Grid item xs={12} sx={{ mt: 3 }} key={index}>
                      <PostCard userIdPost={value.user_id} postId={value.id} text={value.text} image={value.image} username={value?.user?.username} date={value.updatedAt} profileImage={value.user?.image} />
                    </Grid>
                  </div>
                )
              } else {
                return (
                  <div key={`${value}2${index}`}>
                    <Grid item xs={12} sx={{ mt: 3 }} key={index}>
                      <PostCard userIdPost={value.user_id} postId={value.id} text={value.text} image={value.image} username={value?.user?.username} date={value.updatedAt} profileImage={value.user?.image} />
                    </Grid>
                  </div>
                )
              }
            })
          }
          {/* </Grid> */}
        </Box>
      </Container >
    </ThemeProvider>
  )
} 
