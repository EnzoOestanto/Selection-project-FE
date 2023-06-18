import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { getUserAPI } from '../../API/userAPI';



export default function ProfileCard(props) {
    const [profileImage, setProfileImage] = React.useState(null);
    const id = localStorage.getItem('id')
    const username = localStorage.getItem('username')
    
    
    const imageCheck = async() => {
        const response = await getUserAPI(id)
        setProfileImage(response?.data?.image)
        
    };
    React.useEffect(() => {
        imageCheck()
    }, [])

    return (
        <Card elevation={0} >
            <CardHeader
                avatar={
                    <Avatar alt={username} src={`${process.env.REACT_APP_API_URL}/images/${profileImage}`} sx={{ bgcolor: red[500] }} aria-label="profile">
                    </Avatar>
                }
                title={username}  
            />
        </Card>
    );
}
