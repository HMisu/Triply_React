import React, {useEffect} from 'react';
import axios from "axios";
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import {MoonLoader} from "react-spinners";
import {Grid} from '@mui/material';
import {setIsLogin, setLoginUserId, setLoginUserName} from '../../slices/userSlice';

const GoogleLogin = () => {
    const dispatch = useDispatch();
    const navi = useNavigate();

    const API_URL = process.env.REACT_APP_ROOT;

    useEffect(() => {
        const params = new URL(document.location.toString()).searchParams;
        const google_client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;
        const google_secret_key = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
        const code = params.get("code");
        const google_redirect_url = 'http://localhost:3000/oauth/google';
        axios.post(
            `https://oauth2.googleapis.com/token?code=${code}&client_id=${google_client_id}&redirect_uri=${google_redirect_url}&client_secret=${google_secret_key}&grant_type=authorization_code`,
            {headers: {"Content-type": "application/x-www-form-urlencoded"}}
        )
            .then((res) => {
                console.log(res);
                let access_token = res.data.access_token;
                axios.get(
                    `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        }
                    }
                )
                    .then((res) => {
                        axios.post(`${API_URL}/user/sign-up`, {
                            userId: res.data.email,
                            userPw: res.data.id,
                            userName: res.data.name
                        })
                            .then(() => {
                                axios.post(`${API_URL}/user/sign-in`, {
                                    userId: res.data.email,
                                    userPw: res.data.id,
                                    userName: res.data.name
                                })
                                    .then((response2) => {
                                        if (response2.data.item && response2.data.statusCode === 200) {
                                            sessionStorage.setItem('ACCESS_TOKEN', response2.data.item.token);
                                            sessionStorage.getItem('ACCESS_TOKEN');
                                            dispatch(setIsLogin(true));
                                            dispatch(setLoginUserId(res.data.email));
                                            dispatch(setLoginUserName(res.data.name));
                                            navi('/');
                                        }
                                    })
                            })
                            .catch((e) => {
                                if (e.response.data.errorCode === 301) {
                                    axios.post(`${API_URL}/user/sign-in`, {
                                        userId: res.data.email,
                                        userPw: res.data.id,
                                        userName: res.data.name
                                    })
                                        .then((response2) => {
                                            if (response2.data.item && response2.data.statusCode === 200) {
                                                sessionStorage.setItem('ACCESS_TOKEN', response2.data.item.token);
                                                sessionStorage.getItem('ACCESS_TOKEN');
                                                dispatch(setIsLogin(true));
                                                dispatch(setLoginUserId(res.data.email));
                                                dispatch(setLoginUserName(res.data.name));
                                                console.log()
                                                navi('/');
                                            }
                                        })
                                        .catch((e) => {
                                            alert('회원탈퇴한 계정입니다.');
                                            navi('/');
                                            console.error(e);
                                        });
                                }
                            });
                    })
                    .catch((e) => {
                        console.error(e);
                    });
            });
    }, []);

    return (
        <Grid container marginBottom='30%' marginTop='10%' style={{position: 'flex'}}>
            <Grid item xs={12} style={{position: 'absolute', left: '50%'}}>
                <MoonLoader color="#558BCF"/>
            </Grid>
        </Grid>
    );
}

export default GoogleLogin