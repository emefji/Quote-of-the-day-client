import React, { useEffect, useState } from 'react'
import moment from "moment"
import http from '../functions/httprequests';
import Quote from './Quote'

export default function List(props: DettaBehöverInteHeta_PropsForComponent) {

    //const documents: Array<IQuote> = []
    const [quotes, setQuotes] = useState<IQuote[]>([])

    useEffect(() => {
        async function getQuotes() {
            const result = await http({
                url: "/quote",
                method: "GET",
            })

            setQuotes(result.quotes)
            console.log(result)
        }
        
        getQuotes();

    }, [])

    // Hämta data från backend
    // Displaya varje quote

    return (
        <div>
            {
                quotes.map((currentQuote) => <Quote 
                    key={currentQuote._id}
                    fingerprint={props.fingerprint}
                    quoteDocument={{
                        _id: currentQuote._id,
                        author: currentQuote.author,
                        quote: currentQuote.quote,
                        comments: currentQuote.comments,
                        likes: currentQuote.likes,
                        createdAt: moment(currentQuote.createdAt).toDate(),
                        updatedAt: moment(currentQuote.updatedAt).toDate()
                    }}
                />)
            }
           {/*  {<Quote 
                quoteDocument={{
                    _id: "",
                    author: "Göran svensson",
                    quote: "Grönt är bara nice på sommaren, typ",
                    comments: [],
                    likes: [],
                    createdAt: new Date(),
                    updatedAt: new Date()
                }}
            />} */}
        </div>
    )
}

interface DettaBehöverInteHeta_PropsForComponent {
    fingerprint: string
}