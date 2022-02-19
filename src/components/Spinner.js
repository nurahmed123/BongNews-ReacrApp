import React, { Component } from 'react'
import loading from '../spinner.gif'

export default class Spinner extends Component {
    render(props) {
        return (
            <div className="img-container d-flex justify-content-center" style={{width: this.props.width, height: this.props.height===""?"0px":this.props.height, alignItems: "center" }}>
                <img src={loading} alt="loading..."/>
            </div>
        )
    }
}