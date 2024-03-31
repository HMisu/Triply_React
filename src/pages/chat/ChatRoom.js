import React, {useCallback, useEffect, useRef, useState} from 'react';
import '../../scss/pages/chat/ChatRoom.scss';
import Modal from '../../components/ui/Modal';
import { SvgIcon } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Input from '../../components/ui/lnput/Input';
import { useNavigate, useParams } from 'react-router-dom';
import ChatByPartner from './ChatByPartner';
import ChatByOwn from './ChatByOwn';
import {connect, useDispatch, useSelector} from 'react-redux';
import {CompatClient, Stomp, StompJS} from '@stomp/stompjs';
import SockJs from 'sockjs-client';
import {getMessages} from "../../apis/chatRoomApi";

const ChatRoom = () => {
    const navi = useNavigate();
    const dispatch = useDispatch();

    const { chatRoomId } = useParams();
    const messageList = useSelector(state => state.chatRoomSlice.messages);
    const currentUserId = useSelector(state => state.userSlice.loginId);
    const token = sessionStorage.getItem("ACCESS_TOKEN");

    var sock = new SockJs('http://localhost:9090/chatting');
    let client = Stomp.over(sock);

    useEffect(() => {
        client.connect({}, () => {
            console.log('connected');
            client.subscribe('/sub/'+ chatRoomId, (message) => {
                return JSON.parse(message.body);
                // dispatch(getMessages(chatRoomId));
            });
        })
        return () => {
            client.disconnect();
        }
    }, [client, chatRoomId, dispatch]);

    // 입력한 채팅 내용
    const [message, setMessage] = useState('');

    // 채팅 내용 전송
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message === '') return;
        client.send(
            `/pub/send-message`,
            {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            JSON.stringify({
                chatRoomId: chatRoomId,
                sender: currentUserId,
                message: message,
            })
        );
        setMessage('');
    };
    
    // 뒤로가기 버튼 메소드
    const handleBack = () => {
        navi(-1);
    };

    // 초기 렌더링 시 content 영역 style 변경
    useEffect(() => {
        const contentElement = document.querySelector('.content');

        contentElement.style.padding = '0';
        contentElement.style.marginBottom = '0';
        contentElement.style.width = '100%';
        dispatch(getMessages(chatRoomId));
        return () => {
            contentElement.style.padding = '';
        };
    }, []);

  return (
    <div className='ChatRoom'>
        <div className='chat-room-title-container'>
            <div className='chat-room-title-backbutton'>
                <img src={process.env.PUBLIC_URL + '/assets/icons/back_btn.svg'} alt="" onClick={handleBack}/>
            </div>
            <div className='chat-room-title-name'>
                {/* todo : 상대방 이름 구현해야함 */}
                <h1>{}</h1>
            </div>
            <div className='chat-room-title-option'>
                <Modal svg={<SvgIcon component={MoreHorizIcon}/>}/>
            </div>
        </div>
        <div className='chat-room-chat-area'>
            {/* chatList에 채팅들 담아와서 내꺼 상대꺼 구분해서 출력 */}
            {messageList.map((chat, idx) => {
                if (chat.sender === currentUserId) {
                    return <ChatByOwn key={idx} chat={chat}></ChatByOwn>
                } else {
                    return <ChatByPartner key={idx} chat={chat}></ChatByPartner>
                }
            })}
        </div>     



        <div className='chat-room-input-container'>
            <div className='chat-room-input-file'>
                <img src={process.env.PUBLIC_URL + '/assets/icons/clip.svg'} alt="" />
            </div>
            <form className='chat-room-input-text' onSubmit={handleSendMessage}>
                <Input
                    type='text'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></Input>
            </form>
            <div className='chat-room-input-send' onClick={handleSendMessage}>
                <img src={process.env.PUBLIC_URL + '/assets/icons/send_out.svg'} alt="" />
            </div>
        </div>
    </div>
  );
}

export default ChatRoom;