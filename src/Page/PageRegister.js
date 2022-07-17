import { Fragment, useState, createRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Box, Button, Typography, Link } from "@mui/material"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Config/firebase'

export default function () {
    let navigate = useNavigate();
    const [state, setState] = useState({ messageError: '' })
    const formItem = createRef()

    function sumbitData(e) {
        e.preventDefault()
        const form = new FormData(formItem.current)
        if (form.get('password') !== form.get('password2')) {
            setState({ ...state, messageError: 'Password salah' })
        } else {
            createUserWithEmailAndPassword(auth, form.get('email'), form.get('password'))
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user);
                    window.location.href = '/'
                })
                .catch((error) => {
                    setState({ ...state, messageError: error.message })
                });
        }
    }

    return <Fragment>
        <Container maxWidth="sm" sx={{ pt: 10 }}>
            <Box>
                <form onSubmit={(e) => sumbitData(e)} ref={formItem}>
                    <Typography variant="h3" sx={{ mb: 2 }} >
                        Register Apps
                    </Typography>
                    <TextField label="Email" variant="outlined" sx={{ mb: 2 }} fullWidth name="email" required={true} />
                    <TextField type="password" label="Password" variant="outlined" sx={{ mb: 2 }} fullWidth name="password" required={true} />
                    <TextField type="password" label="Ketik Ulang Password" variant="outlined" sx={{ mb: 1 }} fullWidth name="password2" required={true} />
                    {(state.messageError !== null) && <Typography variant="subtitle1" component="div" sx={{ color: 'red' }}>{state.messageError}</Typography>}
                    <Button type="submit" variant="contained" sx={{ mt: 2, mb: 2 }} fullWidth>Register Now</Button>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Link sx={{ textDecoration: 'none', cursor: 'default' }} onClick={() => navigate('/login')}>
                            Sudah Punya Akun ? Login
                        </Link>
                    </Box>
                </form>
            </Box>
        </Container>
    </Fragment >
} 