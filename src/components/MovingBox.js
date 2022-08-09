import React, { Component } from "react";

class MovingBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            isActive: false,
            colors: [
                "cyan",
                "red",
                "yellow",
                "pink",
                "orange",
                "grey",
                "green",
                "whitesmoke",
            ],
            id: this.props.id,
        };
    }

    render() {
        return (
            <div
                className="boxes col-sm-2"
                id={this.state.id}
                onClick={() => {
                    this.props.setTarget(this.state.id);
                }}
                style={{
                    zIndex: this.props.id,
                    height: "100px",
                    backgroundColor: this.state.colors[this.state.id % 6],
                    top: "0px",
                    left: "0px",
                    margin: "10px 20px 10px 20px",
                }}
            >
                ID: {this.state.id}
            </div>
        );
    }
}

export default MovingBox;
