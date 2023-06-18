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
    const [expanded, setExpanded] = React.useState(false);
    const [showImage, setShowImage] = React.useState(true)
    const date = new Date(props.date)
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', time: 'long' };
    const imageCheck = () => {
        if (!props.image) {
            setShowImage(false);
        }
    };
    React.useEffect(() => {
        imageCheck()
    }, [])

    return (
        <Card >
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={`${props.username}`}
                subheader={date.toLocaleDateString('en-EN', options)}
            />
            {showImage ?
                <CardMedia
                    component="img"
                    height="194"
                    image={`${process.env.REACT_APP_API_URL}/images/${props.image}`}
                    alt="no image"

                /> :
                null
            }

            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {props.text}
                </Typography>
            </CardContent>
            <IconButton aria-label="add to favorites">
                <FavoriteIcon />
            </IconButton>
        </Card>
    );
}
