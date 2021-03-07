import React from 'react'
import { useState } from 'react'
import heart from "../assets/heart.svg"
import message from "../assets/message.svg"
import http from '../functions/httprequests'

import "./Quote.css"

export default function Quote(props: PropsForComponent) {

    const [commentsActive, setCommentsActive] = useState(false)

    async function like() {
        const result = await http({
            url: "/quote/like",
            method: "PATCH",
            data: {
                fingerprint: props.fingerprint,
                like: true,
                id: props.quoteDocument._id
            }
        })
        console.log(result)
    }

    function comment() {
        console.log("PING PONG2")
        setCommentsActive(!commentsActive)
    }

    return (
        <div className="all">
            <div className="interact_container">
                <div className="likes_container">
                    <img onClick={like} className="heart_icon" src={heart} alt="" />
                    <p>{props.quoteDocument.likes.length}</p>
                </div>
                <img onClick={comment} className="comment_icon" src={message} alt="" /> 
            </div>
            <p className="quote">{props.quoteDocument.quote}</p>
            <p className="author">{props.quoteDocument.author}</p>
            <p className="createdAt">{props.quoteDocument.createdAt.toISOString()}</p>
            <button className="updateButton">update</button>
            <button className="deleteButton">delete</button>
            {commentsActive ? 
                <div className="comments">
                    <p>TJINGELING</p>
                </div>
                : null
            }
        </div>
    )
}

interface PropsForComponent {
    quoteDocument: IQuote,
    fingerprint: string
}

/**
_id string
author string
quote string
likes []
comments []
updatedAt Date
createdAt Date
 */