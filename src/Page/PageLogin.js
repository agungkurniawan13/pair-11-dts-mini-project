import { createRef, Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Box, Button, Typography, Link } from "@mui/material"
import { auth } from '../Config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function () {
    let navigate = useNavigate();
    const [state, setState] = useState({ messageError: '' })
    const formItem = createRef()

    function sumbitData(e) {
        e.preventDefault()
        const form = new FormData(formItem.current)
        signInWithEmailAndPassword(auth, form.get('email'), form.get('password'))
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                window.location.href = '/'
            })
            .catch((error) => {
                setState({ ...state, messageError: error.message })
            });
    }

    return <Fragment>
        <Container maxWidth="sm" sx={{ pt: 10 }}>
            <Box>
                <form onSubmit={(e) => sumbitData(e)} ref={formItem}>
                    <Typography variant="h3" sx={{ mb: 2 }} >
                        Login Apps
                    </Typography>
                    <TextField label="Email" variant="outlined" sx={{ mb: 2 }} fullWidth name="email" required={true} />
                    <TextField type="password" label="Password" variant="outlined" sx={{ mb: 1 }} fullWidth name="password" required={true} />
                    {(state.messageError !== null) && <Typography variant="subtitle1" component="div" sx={{ color: 'red' }}>{state.messageError}</Typography>}
                    <Button type="submit" variant="contained" sx={{ mt: 2, mb: 2 }} fullWidth>Login</Button>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Link sx={{ textDecoration: 'none', cursor: 'default' }} onClick={() => navigate('/register')}>
                            Belum Punya Akun ? Register
                        </Link>
                    </Box>
                </form>
            </Box>
        </Container>
    </Fragment >
} 