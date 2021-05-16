import { Interface } from 'node:readline'
import React, { Props, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import http from '../functions/httprequests'
import './CommentsPage.css';
import CreateComments from "./CreateComments"

export default function CommentsPage(props: PropsForComponent) {

    const [quoteDocument, setquoteDocument] = useState<IQuote | undefined>(undefined)

    useEffect(() => {

        http({
            url: "/quote",
            method: "GET",
            data: {
                id: props.match.params.id
            }
        }).then((response) => {
            setquoteDocument(response as unknown as IQuote);
        })
    }, [props.match.params.id])

    function updateLocally(id: string, author: string, comment: string) {
        console.log(id, author, comment)
        quoteDocument?.comments.push({
            comment: comment,
            _id: id,
            author: author,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        setquoteDocument(JSON.parse(JSON.stringify(quoteDocument)))
    }

    if (quoteDocument === undefined) {
        return null;
    }

    return (
        <div>
            { /* DESIGNA ALLA COMMENTS BRA */}
            <Link className="home-btn" to="/">Home</Link>
            <div className="all-the-sutff-for-create-comments-yes">
                <CreateComments id={props.match.params.id} createCommentLocally={updateLocally} />
            </div>
            {
                quoteDocument.comments.map((comment) =>
                    <div key={comment._id} className="commentContainer">
                        <p className="commentText"> "{comment.comment}"</p>
                        <p className="commentAText"> {comment.author}</p>
                    </div>
                )
            }
        </div>
    )
}

interface PropsForComponent {
    match: {
        params: {
            id: string
        }
    }
}