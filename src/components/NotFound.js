import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NotFound extends Component {
    render() {
        return (
            <>
                <h1>404 Page is not found</h1>
                <Link to="/">Go Home</Link>
            </>
        )
    }
}
