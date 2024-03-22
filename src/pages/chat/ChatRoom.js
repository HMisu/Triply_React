import React from 'react';
import '../../scss/pages/chat/ChatRoom.scss';
import Modal from '../../components/ui/Modal';
import { SvgIcon } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Input from '../../components/ui/lnput/Input';

const ChatRoom = ( ) => {
    const menu = [
        {
          text: "나가기",
          onclick: () => {console.log('나가기')}
        },
        {
          text: "신고하기",
          style: {color: '#ED3737'},
          onclick: () => {console.log('신고하기')}
        }
      ];

      const userInfo = {
        name: '김태현',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7MnOcQUfqtgTKRpCld7E-_P2JCyF-QMlesD887gUZ6A&s',
        tag1: '태그1',
        tag2: '태그2',
        tag3: '태그3'
      }

  return (
    <div className='ChatRoom'>
        <div className='chat-room-title-container'>
            <div className='chat-room-title-backbutton'>
                <img src={process.env.PUBLIC_URL + '/assets/icons/back_btn.svg'} alt="" />
            </div>
            <div className='chat-room-title-name'>
                <h1>{userInfo.name}</h1>
            </div>
            <div className='chat-room-title-option'>
                <Modal svg={<SvgIcon component={MoreHorizIcon}/>} item={menu}/>
            </div>
        </div>
        <div className='chat-room-chat-area'>
            {/* 컴포넌트 화 필요 */}
            <div className='chat-room-chat-container'>
                <div className='chat-room-chat-user-img'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7MnOcQUfqtgTKRpCld7E-_P2JCyF-QMlesD887gUZ6A&s'></img>
                </div>
                <div className='chat-room-chat-user-text'>
                    <p>askl,jhkajlshdfkjasdfkjagskjqwekjgazjkhdfvgkjagfkjhqgr
                        sdasdaksjdgaskjdhgjhnasd
                        askjdgajhsgdjhg
                    </p>
                </div>
            </div>

            <div className='chat-room-chat-container'>
                <div className='chat-room-chat-user-img'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7MnOcQUfqtgTKRpCld7E-_P2JCyF-QMlesD887gUZ6A&s'></img>
                </div>
                <div className='chat-room-chat-user-text'>
                    <p>askl,jhkajlshdfkjasdfkjagskjqwekjgazjkhdfvgkjagfkjhqgr</p>
                </div>
            </div>

            <div className='chat-room-chat-container'>
                <div className='chat-room-chat-user-img'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7MnOcQUfqtgTKRpCld7E-_P2JCyF-QMlesD887gUZ6A&s'></img>
                </div>
                <div className='chat-room-chat-user-text'>
                    <p>askl,jhkajlshdfkjasdfkjagskjqwekjgazjkhdfvgkjagfkjhqgr</p>
                </div>
            </div>
            <div className='chat-room-chat-container'>
                <div className='chat-room-chat-user-img'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7MnOcQUfqtgTKRpCld7E-_P2JCyF-QMlesD887gUZ6A&s'></img>
                </div>
                <div className='chat-room-chat-user-text'>
                    <p>askl,jhkajlshdfkjasdfkjagskjqwekjgazjkhdfvgkjagfkjhqgr</p>
                </div>
            </div>
        </div>


        <div className='chat-room-input-container'>
            <div className='chat-room-input-file'>
                <img src={process.env.PUBLIC_URL + '/assets/icons/clip.svg'} alt="" />
            </div>
            <div className='chat-room-input-text'>
                <Input></Input>
            </div>
            <div className='chat-room-input-send'>
                <img src={process.env.PUBLIC_URL + '/assets/icons/send_out.svg'} alt="" />
            </div>
        </div>
    </div>
  );
}

export default ChatRoom;