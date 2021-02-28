interface IQuote {
    _id: string
    author: string
    quote: string
    likes: Array<ILike>
    comments: Array<IComment>
    updatedAt: Date
    createdAt: Date
}