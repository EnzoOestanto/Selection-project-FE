import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { deletePostAPI, editPostAPI } from '../../API/postAPI';
import { toast } from 'react-hot-toast';
import { addLikeAPI, deleteLikeAPI, getLikesAPI } from '../../API/likeAPI';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { getUserAPI } from '../../API/userAPI';



const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function PostCard(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [edit, setEdit] = React.useState(false)
    const [disabled, setDisabled] = React.useState(false)
    const textRef = React.useRef('')
    const [rf, setRf] = React.useState(false)
    const [postText, setPostText] = React.useState(props.text)
    const [postLiked, setPostLiked] = React.useState(false)
    const userId = Number(localStorage.getItem('id'))
    const postId = props.postId
    const userIdPost = props.userIdPost
    const [logedIn, setLogedIn] = React.useState(false)
    const [activactionStatus, setActivactionStatus] = React.useState(false)

    // if (props.username !== localStorage.getItem('username')) {
    //     setDisabled(true)
    // }
    // const idCheck = () => {
    //     if( userId !== userIdPost){
    //         setDisabled(true)
    //     }
    // }
    const loginCheck = async () => {
        try {
            if (userId) {
                let response = await getUserAPI(userId)
                console.log('PS', response)
                if (response?.data?.data?.status === true) {
                    setActivactionStatus(true)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }



    const userCheck = () => {
        console.log('cehck user', userId, userIdPost)
        if (userIdPost !== userId) {
            setDisabled(true)
        }

    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const deletePost = async () => {
        try {

            console.log('deletePost')
            const response = await deletePostAPI(postId)
            if (response?.data?.success === true) {
                setTimeout(() => {
                    window.location.reload(false)
                }, 2000);
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
        }

    }
    const editPost = () => {
        console.log('editPost')
        setEdit(true)
    }
    const savePost = async () => {
        try {
            const text = textRef.current.value
            console.log('text', text)
            const response = await editPostAPI({ postId, text })
            console.log('respone', response)
            if (response?.data?.success === true) {
                setEdit(false)
                setTimeout(() => {
                    window.location.reload(false)
                }, 2000);
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const [expanded, setExpanded] = React.useState(false);
    const [showImage, setShowImage] = React.useState(true)
    const date = new Date(props.date)
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', time: 'long' };
    const imageCheck = () => {
        if (!props.image) {
            setShowImage(false);
        }
    };
    const [totalLikes, setTotalLikes] = React.useState(0)
    const getLikes = async () => {
        try {
            const response = await getLikesAPI({ postId, userId })
            // console.log('likes', response)
            if (response?.data?.success === true) {
                setTotalLikes(response.data.totalLikes)
                if (response?.data?.data !== 0) {
                    setPostLiked(true)
                } else {
                    setPostLiked(false)
                }
            }

        } catch (error) {
            console.log(error)
        }

    }

    const handleLikes = async () => {
        try {
            const response = await addLikeAPI({ postId, userId })
            if (response?.data?.success === true) {
                toast.success(response.data.message)
                setRf(!rf)
            }
        } catch (error) {
            console.error(error)
        }
    }
    const handleUnlike = async () => {
        try {
            const response = await deleteLikeAPI({ postId, userId })
            console.log('del', response)
            if (response?.data?.success === true) {
                toast.success(response.data.message)
                setRf(!rf)
            }

        } catch (error) {
            console.error(error)
        }
    }

    React.useEffect(() => {
        getLikes()
    }, [rf])

    React.useEffect(() => {
        imageCheck()
        userCheck()
        getLikes()
    }, [])

    return (
        <Card  >
            <CardHeader
                avatar={
                    <Avatar alt={props.username} src={`${process.env.REACT_APP_API_URL}/images/${props.profileImage}`} sx={{ bgcolor: red[500] }} aria-label="profile">
                    </Avatar>
                }
                action={
                    <>
                        <IconButton
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            disabled={disabled}>
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={() => { deletePost() }}>Delete</MenuItem>
                            <MenuItem onClick={() => { editPost() }}>Edit</MenuItem>
                        </Menu>
                    </>
                }
                title={`${props.username}`}
                subheader={date.toLocaleDateString('en-EN', options)}
            />
            {showImage ?
                <CardMedia>
                    <div className='flex justify-center'>
                        <img className='h-60 ' src={`${process.env.REACT_APP_API_URL}/images/${props.image}`} />
                    </div>
                </CardMedia>
                :
                null
            }
            <CardContent>

                {edit ? <>
                    <TextField
                        fullWidth
                        id="ftext"
                        name="text"
                        multiline
                        defaultValue={postText}
                        inputRef={textRef}
                        focused

                    />

                    <div className='mt-2'>
                        <Button variant="contained" xs={12} onClick={() => savePost()} >
                            save
                        </Button>
                    </div>
                </>
                    :
                    <Typography variant="body2" color="text.secondary">
                        {props.text}
                    </Typography>
                }
            </CardContent>
            {postLiked ? <>
                <IconButton disabled={activactionStatus} sx={{ ml: 2, }} onClick={() => handleUnlike()} aria-label="add to favorites" color="error">
                    <FavoriteIcon />
                    <Typography sx={{ ml: 2 }} variant="body1" color="text.secondary">
                        {totalLikes}
                    </Typography>
                </IconButton>
            </>
                :
                <IconButton disabled={activactionStatus} sx={{ ml: 2 }} onClick={() => handleLikes()} aria-label="add to favorites">
                    <FavoriteBorderIcon />
                    <Typography sx={{ ml: 2 }} variant="body1" color="text.secondary">
                        {totalLikes}
                    </Typography>
                </IconButton>
            }
        </Card>
    );
}
