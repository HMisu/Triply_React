import {createSlice} from "@reduxjs/toolkit";
import {signin, signout, signup, uploadProfileImage} from "../apis/userApi";


const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogin: false,
        loginUserId: '',
        loginUserName: '',
        profileImageUrl: '',
    },
    reducers: {
        updateUserName: (state, action) => {
            state.loginUserName = action.payload;
        },
        setProfileImageUrl: (state, action) => {
            state.profileImageUrl = action.payload;
        },
        setIsLogin: (state, action) => {
            state.isLogin = action.payload;
        },
        setLoginUserId: (state, action) => {
            state.loginUserId = action.payload;
        },
        setLoginUserName: (state, action) => {
            state.loginUserName = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signup.fulfilled, (state, action) => {
            window.location.href = "/user/sign-in";
            return state;
        });
        builder.addCase(signup.rejected, (state, action) => {
            alert(`회원가입에 실패하셨습니다. 다시 시도해주세요.`);
            return state;
        });
        builder.addCase(signin.fulfilled, (state, action) => {
            sessionStorage.setItem("ACCESS_TOKEN", action.payload.token);
            return {
                ...state,
                isLogin: true,
                loginUserId: action.payload.userId,
                loginUserName: action.payload.userName,
                profileImageUrl: action.payload.profileImageUrl
            }
        });
        builder.addCase(signin.rejected, (state, action) => {

            const errorMessage = "아이디 또는 비밀번호가 틀렸습니다. 다시 입력해주세요.";
            window.location.replace("/user/sign-in")
            alert(errorMessage);
        });
        builder.addCase(signout.fulfilled, (state, action) => {
            if (action.payload.success) {
                sessionStorage.removeItem("ACCESS_TOKEN");
                return {
                    ...state, isLogin: false, loginUserId: "", loginUserName: '',
                    profileImageUrl: ''
                };
            } else {
                return state;
            }
        });
        builder.addCase(uploadProfileImage.fulfilled, (state, action) => {
            state.profileImageUrl = action.payload;
        });
    },
});

export const {updateUserName, setProfileImageUrl, setIsLogin, setLoginUserId, setLoginUserName} = userSlice.actions;
export default userSlice.reducer;