import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_ROOT;

export const getChatList = createAsyncThunk(
    'chat/getChatList',
    async (currentUserId, thunkAPI) => {
        try {
            const response = await axios.get(
                `${API_URL}/chat/getChatList`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
                    },
                    params: {
                        userId: currentUserId
                    }
                }
            );
            return response.data.item.chatList;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const makeChatRoom = createAsyncThunk(
    'chat/makeChatRoom',
    async (chatMakeInfo, thunkAPI) => {
        try {
            const response = await axios.post(
                `${API_URL}/chat/make-chat`,
                chatMakeInfo,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
                    }
                }
            )
            return response.data.item;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);