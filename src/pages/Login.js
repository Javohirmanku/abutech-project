import React, {useState} from 'react'
import {Avatar, Button, Grid, Paper, TextField} from "@mui/material";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import axios from "axios";
import routes from "../routes";
import LinearProgress from "@mui/material/LinearProgress";

const Login = ({setLoading, loading, setIsAuth}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        setLoading(true);
        try {
            const res = await axios.post(routes.login, {email, password});
            localStorage.setItem('token', res.data.token);
            setIsAuth(true);
            setLoading(false);
        } catch (e) {
            console.log(e)
            // console.log(e.response.data.error);
            alert(e.response.data.error);
        }
        setLoading(false);

        console.log(email, password);
    }

    const paperStyle = {padding: 20, height: '70vh', width: 280, margin: "20px auto"}
    const avatarStyle = {backgroundColor: '#1bbd7e'}
    const btnstyle = {margin: '8px 0'}
    return (
        <Grid>
            {loading && <LinearProgress/>}
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOpenIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>

                <TextField
                    label='Email'
                    placeholder='Enter Email'
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    sx={{mt: 2}}
                    label='Password'
                    type='password'
                    placeholder='Enter Password'
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                    type='submit'
                    color='primary'
                    variant="contained"
                    style={btnstyle}
                    fullWidth
                    onClick={login}
                >
                    Sign in
                </Button>
            </Paper>
        </Grid>
    )
}

export default Login