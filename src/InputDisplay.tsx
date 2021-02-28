import React from 'react'

export default function InputDisplay(props: PropsForComponent) {
    return (
        <div>
            <p>{props.inputText}</p>
        </div>
    )
}

interface PropsForComponent {
    inputText: string
}