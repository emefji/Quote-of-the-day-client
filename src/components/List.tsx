import { useEffect, useState } from 'react'
import moment from "moment"
import http from '../functions/httprequests';
import Quote from './Quote'
import NewQuote from "./NewQuote"
import './List.css';
import socket from '../functions/socket_connection';

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

    function createCommentLocally(id: string, author: string, comment: string) {
        // Hitta rätt quotedocument
        const match = quotes.find((currentQuote) => currentQuote._id === id)
        if (!match) {
            console.log("Vi kunde inte hitta commenten")
            return
        }

        match.comments.push({
            _id: (Math.random() * 100000).toString(),
            author: author,
            comment: comment,
            createdAt: moment().toDate(),
            updatedAt: moment().toDate()
        })

        setQuotes(JSON.parse(JSON.stringify(quotes)))     
    }

    function deleteQuoteLocally(id: string) {
        // Hitta rätt quotedocument
        const matchIndex = quotes.findIndex((currentQuote) => currentQuote._id === id)
        if (matchIndex < 0) {
            console.log("Vi kunde inte hitta quoten")
            return
        }

        else {
            quotes.splice(matchIndex, 1)
            const newQuotes = JSON.parse(JSON.stringify(quotes))
            setQuotes(newQuotes);
        }
    }

    function createQuoteLocally(id: string, createdAt: Date, updatedAt: Date, author: string, quote: string) {
        quotes.push({
            _id: id,
            author: author,
            quote: quote,
            comments: [],
            likes: [],
            createdAt: createdAt,
            updatedAt: updatedAt
        })

        setQuotes(JSON.parse(JSON.stringify(quotes)))   
    }

    useEffect(() => {
        
        socket.on("like", (data: {
            id: string,
            like: boolean,
            fingerprint: string
        }) => {

            // Hitta rätt quote
            const quote = quotes.find(current => current._id.toString() === data.id)
            if (quote === undefined) {
                return;
            }

            const likeFingerprintIndex = quote.likes.findIndex(fingerprint => fingerprint === data.fingerprint)
            if (likeFingerprintIndex === -1) {
                //skapa like
                quote.likes.push(data.fingerprint)
            } 
            else {
                quote.likes.splice(likeFingerprintIndex)
            }

            setQuotes(JSON.parse(JSON.stringify(quotes)));

            //ta bort like
        })

        socket.on("deleteQuote", (id: string) => {
            const quoteIndex = quotes.findIndex(current => current._id.toString() === id)
            if (quoteIndex === -1) {
                return;
            }

            quotes.splice(quoteIndex)

            setQuotes(JSON.parse(JSON.stringify(quotes)));
        })

        return () => {
            
        }
    }, [quotes])

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


            <NewQuote updateLocally={createQuoteLocally} />
            <div className="list-container">
                {
                    quotes.map((currentQuote) => <Quote 
                        key={currentQuote._id}
                        createCommentLocally={createCommentLocally}
                        locallyChangeQuote={likeLocally}
                        deleteQuoteLocally={deleteQuoteLocally}
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
            </div>
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