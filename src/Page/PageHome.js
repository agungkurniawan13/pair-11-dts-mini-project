import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, ImageList, ImageListItem, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { signOut } from 'firebase/auth'
import { auth } from '../Config/firebase.js'
import { config } from "../Config/config.js"

export default function () {
    let navigate = useNavigate();

    const [state, setState] = useState({ listMenu: [] })

    useEffect(() => {

        axios.get(config.baseUrl + '/discover/movie', {
            params: {
                api_key: config.apiKey
            }
        }).then((response) => {

            if (response.status === 200) {
                setState({
                    listMenu: response.data.results
                })
            }

        }).catch((error) => {
            console.log(error);
        })

    }, [])

    // useEffect(() => {
    //     console.log('hook state', state);
    // }, [state])

    async function logout() {
        try {
            await signOut(auth)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            {/* {user.email} */}
            {/* <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>


                    </Toolbar>
                </Container>
            </AppBar> */}

            <Button variant="contained" onClick={() => { logout() }}>Logout</Button>

            <ImageList cols={4} >
                {state.listMenu.map((item) => (
                    <ImageListItem key={item.id}>
                        <img
                            src={`${config.baseUrlImage}${item.backdrop_path}`}
                            alt={item.id}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>

        </div>
    );
};;