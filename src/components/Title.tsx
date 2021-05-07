import React from 'react'

export default function Title(props: PropsForComponent) {
    return (
        <div>
            <h1>{props.Title}</h1>

        </div>
    )
}

interface PropsForComponent {
    Title: string
}