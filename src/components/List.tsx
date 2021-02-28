import React, { useEffect } from 'react'
import http from '../functions/httprequests';
import Quote from './Quote'

export default function List() {

    //const documents: Array<IQuote> = []

    useEffect(() => {
        async function getQuotes() {
            const result = await http({
                url: "/quote",
                method: "GET",
            })

            console.log(result)
        }
        
        getQuotes();

    }, [])

    // Hämta data från backend
    // Displaya varje quote

    return (
        <div>
            <Quote 
                quoteDocument={{
                    _id: "",
                    author: "Göran svensson",
                    quote: "Grönt är bara nice på sommaren, typ",
                    comments: [],
                    likes: [],
                    createdAt: new Date(),
                    updatedAt: new Date()
                }}
            />
        </div>
    )
}
