import React, { useEffect, useState } from 'react'
import moment from "moment"
import http from '../functions/httprequests';
import Quote from './Quote'

export default function List(props: DettaBehöverInteHeta_PropsForComponent) {

    //const documents: Array<IQuote> = []
    const [quotes, setQuotes] = useState<IQuote[]>([])

    function likeLocally(id: string) {
        //quotes[quote]
        const index = quotes.findIndex((currentQuote) => currentQuote._id.toString() === id.toString())
        const fingerprintIndex = quotes[index].likes.findIndex((currentLike) => currentLike === props.fingerprint)

        // Om fingerpinr är mindre än 0 så lägger vi till fingerpirnten
        if (fingerprintIndex < 0) {
            quotes[index].likes.push(props.fingerprint)
        } else {
            quotes[index].likes.splice(fingerprintIndex, 1)
        }

        // Vi kopierar och uppdaterar
        setQuotes(JSON.parse(JSON.stringify(quotes)))        
    }

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
                    locallyChangeQuote={likeLocally}
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