import React, { useState } from 'react'
import http from '../functions/httprequests';

export default function CreateComments(props: PropsForComponent) {

    // author 
    // comment

    const [author, setAuthor] = useState("");
    const [comment, setComment] = useState("");

    async function publishComment() {

        if (author.length === 0 || comment.length === 0) {
            return;
        }

        const response = await http({
            url: "/quote/comment",
            method: "POST",
            data: {
                author: author,
                comment: comment,
                id: props.id
            }
        })

        props.createCommentLocally(props.id, author, comment)

        setComment("");
        setAuthor("");

        console.log(response)
    }

    return (
        <div>
            <input placeholder="Author" value={author} onChange={(event) => setAuthor(event.target.value)} />
            <input placeholder="Comment" value={comment} onChange={(event) => setComment(event.target.value)} />
            <button onClick={publishComment}>Submit</button>
        </div>
    )
}

interface PropsForComponent {
    id: string
    createCommentLocally: (id: string, author: string, comment: string) => void
}