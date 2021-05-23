import moment from 'moment'
import React from 'react'
import { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import heart from "../assets/heart.svg"
import message from "../assets/message.svg"
import http from '../functions/httprequests'
import socket from '../functions/socket_connection'
import CreateComments from './CreateComments'

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

        socket.emit("like", {
            id: props.quoteDocument._id,
            like: shouldLike,
            fingerprint: props.fingerprint
        })

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

    async function deleteQuote() {
        // eslint-disable-next-line no-restricted-globals
        let confirmed = confirm("Vill du verkligen ta bort denna quote")

        if (confirmed) {
            await http({
                url: "/quote",
                method: "DELETE",
                data: {
                    id: props.quoteDocument._id
                }
            })
            props.deleteQuoteLocally(props.quoteDocument._id)
            socket.emit("deleteQuote", props.quoteDocument._id);
        }

        else {
            return;
        }

    }

    return (
        <div className="all">
            <div className="interact_container">
                <div className="likes_container">
                    <img onClick={like} className="heart_icon" src={isLiked ? heart : heart} alt="" />
                    <p>{props.quoteDocument.likes.length}</p>
                </div>
                <div className="comment-container">
                    <img onClick={comment} className="comment_icon" src={message} alt="" />
                    <p>{props.quoteDocument.comments.length}</p>
                </div>
            </div>
            <p className="quote">"{props.quoteDocument.quote}"</p>
            <p className="author">{props.quoteDocument.author}</p>
            <p className="createdAt">{moment(props.quoteDocument.createdAt).format("YY/MM/DD HH:mm")}</p>
            <button className="deleteButton" onClick={deleteQuote}>Delete</button>
            {commentsActive ?
                <Redirect to={"/comments/" + props.quoteDocument._id} />
                : null
            }
        </div>
    )
}

// eslint-disable-next-line no-lone-blocks
{/* <div className="comments">
    
    <CreateComments id={props.quoteDocument._id} createCommentLocally={props.createCommentLocally} />
</div> */}

interface PropsForComponent {
    createCommentLocally: (id: string, author: string, comment: string) => void
    locallyChangeQuote: (id: string) => void,
    quoteDocument: IQuote,
    fingerprint: string,
    deleteQuoteLocally: (id: string) => void
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