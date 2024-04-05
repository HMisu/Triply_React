import React from 'react';
import '../../scss/pages/chat/ChatByOwn.scss';

const ChatByOwn = ({message}) => {
  return (
    <div className='ChatByOwn'>
      <div className='chat-user-text'>
        <p>{
            message.img == null
                ? message.message
                : <img src={message.img} alt='보낸 이미지'></img>

        }</p>
      </div>
    </div>
  );
}

export default ChatByOwn;