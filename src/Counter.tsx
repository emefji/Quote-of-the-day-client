import React, { useState } from 'react'

export default function Counter() {

    const [counter, setCounter] = useState(0)

    return (
        <div>
            <h1>{counter}</h1>
            <h1>{counter + 1}</h1>
            <h1>{counter + 2}</h1>
            <h1>{counter + 3}</h1>
            <button onClick={() => setCounter(counter + 1)} >Add</button>
            <button onClick={() => setCounter(counter - 1)} >Subtract</button>
        </div>
    )
}