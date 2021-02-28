import React, { useState } from 'react'
import InputDisplay from './InputDisplay'

export default function Input() {

    const [inputText, setInputText] = useState("Change the title")

    return (
        <div>
            {/* <InputDisplay >{inputText}</InputDisplay> */}
            <InputDisplay inputText={inputText} />
            <input placeholder="ihihihiihiih" value={inputText} onChange={(event) => setInputText(event.target.value)} />
        </div>
    )
}