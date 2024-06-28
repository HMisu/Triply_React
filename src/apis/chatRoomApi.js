import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_ROOT;

export const getMessages = createAsyncThunk(
    'chatRoom/getMessages',
    async (chatRoomId, thunkAPI) => {
        try {
            const response = await axios.get(
                `${API_URL}/chat/${chatRoomId}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
                    }
                }
            );

            return response.data.items;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const deleteChatRoom = createAsyncThunk(
    'chatRoom/deleteChatRoom',
    async (chatRoomId, thunkAPI) => {
        try {
            const response = await axios.delete(
                `${API_URL}/chat/${chatRoomId}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
                    }
                }
            );

            return response.data.item;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

