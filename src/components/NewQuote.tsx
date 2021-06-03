import React, { useState } from 'react'
import http from '../functions/httprequests'
import socket from '../functions/socket_connection'

export default function NewQuote(props: PropsForComponent) {
   const [quoteTitle, setquoteTitle] = useState("")
   const [authorTitle, setauthorTitle] = useState("")
    
    async function createQuote() {
        let quote = quoteTitle
        let author = authorTitle

        if (quoteTitle.length <= 0 || authorTitle.length <= 0) {
           alert("Du måste fylla i author och quote")
           return
        }

        
        const response = await http({
            url: "/quote",
            method: "POST",
            data: {
                author: author,
                quote: quote
            }
        })
        
        socket.emit("createQuote", {
            id: response.quote.id,
            author: authorTitle,
            quote: quoteTitle
        })

        props.updateLocally(
            response.quote.id,
            new Date(),
            new Date(),
            author,
            quote
        );

        setauthorTitle("");
        setquoteTitle("");
    }

    return (
        <div>
            <input placeholder="quote" value={quoteTitle} onChange={(event) => setquoteTitle(event.target.value)}/>
            <input placeholder="author" value={authorTitle} onChange={(event) => setauthorTitle(event.target.value)}/>
            <button className="button" onClick={createQuote}>Create</button>
        </div>
    )
}

interface PropsForComponent {
    updateLocally: (id: string, createdAt: Date, updatedAt: Date, author: string, quote: string) => void
}