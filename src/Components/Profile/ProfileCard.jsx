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


export default function ProfileCard(props) {
    const [profileImage, setProfileImage] = React.useState(false);
    const username = localStorage.getItem('username')
    
    
    // const imageCheck = () => {
    //     if (!props.image) {
    //         setShowImage(false);
    //     }
    // };
    // React.useEffect(() => {
    //     imageCheck()
    // }, [])

    return (
        <Card >
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="profile">
                        R
                    </Avatar>
                }
                title={username}  
            />
        </Card>
    );
}
