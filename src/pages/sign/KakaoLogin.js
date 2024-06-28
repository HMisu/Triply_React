import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import {MoonLoader} from "react-spinners";
import {Grid} from '@mui/material';
import {useDispatch} from 'react-redux';
import {setIsLogin, setLoginUserId, setLoginUserName} from '../../slices/userSlice';

const KakaoLogin = () => {
    const dispatch = useDispatch();
    const navi = useNavigate();

    const API_URL = process.env.REACT_APP_ROOT;

    useEffect(() => {
        const params = new URL(document.location.toString()).searchParams;
        const code = params.get('code');
        const grantType = "authorization_code";
        const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API;
        const REDIRECT_URI = 'http://localhost:3000/oauth/kakao';
        axios.post(
            `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
            {},
            {headers: {"Content-type": "application/x-www-form-urlencoded;charset=utf-8"}}
        )
            .then((res) => {
                const {access_token} = res.data;
                axios.post(
                    `https://kapi.kakao.com/v2/user/me`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                        }
                    }
                )
                    .then((res) => {
                        axios.post(`${API_URL}/user/sign-up`, {
                            userId: res.data.kakao_account.email,
                            userPw: res.data.id,
                            userName: res.data.kakao_account.profile.nickname
                        })
                            .then(() => {
                                axios.post(`${API_URL}/user/sign-in`, {
                                    userId: res.data.kakao_account.email,
                                    userPw: res.data.id,
                                    userName: res.data.kakao_account.profile.nickname
                                })
                                    .then((response2) => {
                                        if (response2.data.item && response2.data.statusCode === 200) {
                                            sessionStorage.setItem('ACCESS_TOKEN', response2.data.item.token);
                                            sessionStorage.getItem('ACCESS_TOKEN');
                                            dispatch(setIsLogin(true));
                                            dispatch(setLoginUserId(res.data.kakao_account.email));
                                            dispatch(setLoginUserName(res.data.kakao_account.profile.nickname));
                                            navi('/');
                                        }
                                    })
                            })
                            .catch((e) => {
                                if (e.response.data.errorCode === 301) {
                                    axios.post(`${API_URL}/user/sign-in`, {
                                        userId: res.data.kakao_account.email,
                                        userPw: res.data.id,
                                        userName: res.data.kakao_account.profile.nickname
                                    })
                                        .then((response2) => {
                                            if (response2.data.item && response2.data.statusCode === 200) {
                                                sessionStorage.setItem('ACCESS_TOKEN', response2.data.item.token);
                                                sessionStorage.getItem('ACCESS_TOKEN');
                                                dispatch(setIsLogin(true));
                                                dispatch(setLoginUserId(res.data.kakao_account.email));
                                                dispatch(setLoginUserName(res.data.kakao_account.profile.nickname));
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
            })
            .catch((e) => {
                console.error(e);
            });
    }, [])

    return (
        <Grid container marginBottom='30%' marginTop='10%' style={{position: 'flex'}}>
            <Grid item xs={12} style={{position: 'absolute', left: '50%'}}>
                <MoonLoader color="#558BCF"/>
            </Grid>
        </Grid>
    );

}

export default KakaoLogin