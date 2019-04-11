import React from 'react';

const Message =({side, avatar, message, name, createdOn})=>(
    <li className="left clearfix">
        <span className={`chat-img pull-${side}`}>
            <img src={avatar} alt="User Avatar" className="img-circle" />
        </span>
        <div className="chat-body clearfix">
            <div className="header">
                <strong className="primary-font">{name}</strong> 
                <small className={`pull-${side} text-muted`}>
                    <span className="glyphicon glyphicon-time"></span>{createdOn}
                </small>
            </div>
            <p className={`pull-${side} text-muted`}>
                {message}
            </p>
        </div>
    </li>
  );

export default Message;
