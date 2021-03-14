import moment from 'moment'
import React from 'react'
import { useState } from 'react'
import heart from "../assets/heart.svg"
import message from "../assets/message.svg"
import http from '../functions/httprequests'

import "./Quote.css"

export default function Quote(props: PropsForComponent) {

    const [commentsActive, setCommentsActive] = useState(false)
    const [isLiked, setIsLiked] = useState(props.quoteDocument.likes.find((current) => current === props.fingerprint) != null)

    async function like() {

        // Kolla om vi har likeat eller inte
        const fingerprintIndex = props.quoteDocument.likes.findIndex((currentLike) => currentLike === props.fingerprint)

        let shouldLike: boolean

        // Om den inte redan finns så vill vi likea
        if (fingerprintIndex < 0) {
            shouldLike = true
            // Om den redan finns då vill vi ta bort like
        } else {
            shouldLike = false
        }

        setIsLiked(shouldLike)

        await http({
            url: "/quote/like",
            method: "PATCH",
            data: {
                fingerprint: props.fingerprint,
                like: shouldLike,
                id: props.quoteDocument._id
            }
        })
        props.locallyChangeQuote(props.quoteDocument._id)
    }

    function comment() {
        setCommentsActive(!commentsActive)
    }

    return (
        <div className="all">
            <div className="interact_container">
                <div className="likes_container">
                    <img onClick={like} className="heart_icon" src={isLiked ? heart : heart} alt="" />
                    <p>{props.quoteDocument.likes.length}</p>
                </div>
                <img onClick={comment} className="comment_icon" src={message} alt="" /> 
            </div>
            <p className="quote">"{props.quoteDocument.quote}"</p>
            <p className="author">{props.quoteDocument.author}</p>
            <p className="createdAt">{moment(props.quoteDocument.createdAt).format("YY/MM/DD HH:mm")}</p>
            <button className="updateButton">Update</button>
            <button className="deleteButton">Delete</button>
            {commentsActive ? 
                <div className="comments">
                    <p>COMMENT</p>
                </div>
                : null
            }
        </div>
    )
}

interface PropsForComponent {
    locallyChangeQuote: (id: string) => void,
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