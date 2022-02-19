import React from 'react'
import loading from '../spinner.gif'

export default function Spinner(props) {
    return (
        <div className="img-container d-flex justify-content-center" style={{ width: props.width, height: props.height === "" ? "0px" : props.height, alignItems: "center" }}>
            <img src={loading} alt="loading..." />
        </div>
    )
}