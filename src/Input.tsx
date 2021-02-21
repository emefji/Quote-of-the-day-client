import React, { useState } from 'react'

export default function Input() {

    const [inputText, setInputText] = useState("Change the title")

    return (
        <div>
            <p>{inputText}</p>
            <input placeholder="ihihihiihiih" value={inputText} onChange={(event) => setInputText(event.target.value)} />
        </div>
    )
}