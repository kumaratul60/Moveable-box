import React, { Component } from "react";
import MovingBox from "../MovingBox";

class BoxContainer extends Component {
    constructor(props) {
        super(props);

        this.addBox = this.addBox.bind(this);
        this.resetBox = this.resetBox.bind(this);
        this.toggleAllListeners = this.toggleAllListeners.bind(this);

        this.state = {
            currentBoxId: 0,
            previousTarget: 0,
            boxes: [],
            currentTarget: 0,
            blockEvent: false,
            toggleImage: "https://img.icons8.com/color/48/000000/toggle-on.png",
        };
    }

    // Reset the box
    resetBox() {
        this.setState({ boxes: [] });
    }

    //Delete the box
    deleteBox(id) {
        let temp = this.state.boxes;

        this.setState({ boxes: [] });

        for (let i = 0; i < temp.length; i++) {
            let boxId = temp[i].props.id;

            if (id !== temp[i].props.id) {
                this.setState({
                    boxes: [
                        ...this.state.boxes,
                        <MovingBox
                            id={boxId}
                            setTarget={(bId) => {
                                this.setTarget(bId);
                            }}
                        />,
                    ],
                });
            }
        }
    }

    //Setting target on the boxes for the movement operations
    setTarget(id) {
        //Current box
        var box = document.getElementById(id);

        //Previous box
        var previousBox = document.getElementById(this.state.currentTarget);

        //De-highlighting the previous box
        if (previousBox !== null) {
            previousBox.style.border = "none";
        }

        //Highlighting the box when clicked
        box.style.border = "5px solid blue";

        //Pixels change in each movement
        var movePixels = 5;

        //Setting the current box in the react state
        this.setState({ currentTarget: id });

        //Event listener for keyboard operations
        window.addEventListener("keydown", (event) => {
            var boundary = document.getElementById("boundary");

            //Boundary width and height
            var boundWidth = parseInt(boundary.style.width);
            var boundHeight = boundary.offsetHeight;

            //Left and right bound limit calculation
            var leftBound = box.offsetLeft;
            var rightBound = boundWidth - leftBound - 100;

            //Top and bottom bound limit calculation
            var topBound = box.offsetTop;
            var bottomBound = boundHeight - topBound - 100;

            //Handling keyboard operations
            if (this.state.currentTarget === id) {
                switch (event.key) {
                    case "w":
                    case "W":
                    case "ArrowUp":
                        if (box.offsetTop >= 10)
                            box.style.top =
                                parseInt(box.style.top) - movePixels + "px";
                        break;
                    case "s":
                    case "S":
                    case "ArrowDown":
                        if (bottomBound >= 10)
                            box.style.top =
                                parseInt(box.style.top) + movePixels + "px";
                        break;
                    case "a":
                    case "A":
                    case "ArrowLeft":
                        if (box.offsetLeft >= 10)
                            box.style.left =
                                parseInt(box.style.left) - movePixels + "px";
                        break;
                    case "d":
                    case "D":
                    case "ArrowRight":
                        if (rightBound >= 10)
                            box.style.left =
                                parseInt(box.style.left) + movePixels + "px";
                        break;

                    case "Delete":
                        this.deleteBox(id);
                        break;

                    default:
                }
            } else {
                if (movePixels === 5) {
                    movePixels = 0;
                }
            }
        });
    }

    //Toggle the keydown event listener for toggling keyboard
    toggleAllListeners() {
        //Setting the keyboard blocking toggle in the react state
        if (this.state.blockEvent) {
            this.setState({
                blockEvent: false,
                toggleImage:
                    "https://img.icons8.com/color/48/000000/toggle-on.png",
            });
        } else {
            this.setState({
                blockEvent: true,
                toggleImage:
                    "https://img.icons8.com/color/48/000000/toggle-off.png",
            });
        }

        //Event listener to block keyboard operations
        window.addEventListener(
            "keydown",
            function (event) {
                var blockEvent = document.getElementById("blockEvent").value;

                if (blockEvent === "true") {
                    event.stopPropagation();
                }
            },
            true
        );
    }

    //Adding boxe component to the box container
    addBox() {
        //Generating new box id
        const newBoxId = this.state.currentBoxId + 1;

        //Pushing new MovingBox component in the boxes[] array of react state
        this.setState({
            boxes: [
                ...this.state.boxes,
                <MovingBox
                    id={newBoxId}
                    setTarget={() => {
                        this.setTarget(newBoxId);
                    }}
                    deleteBox={() => {
                        this.deleteBox(newBoxId);
                    }}
                />,
            ],
            currentBoxId: newBoxId,
        });
    }

    render() {
        return (
            //Boundary for containing all the boxes
            <div
                id="boundary"
                className="container card"
                style={{
                    width: "900px",
                    maxWidth: "950px",
                    minHeight: "500px",

                    top: "5rem",
                }}
            >
                {/* Button for adding more boxes */}

                <h3
                    onClick={this.addBox}
                    className="btn btn-primary"
                    style={{ margin: "10px auto 10px auto" }}
                >
                    Add Box
                </h3>
                <h3
                    onClick={this.resetBox}
                    className="btn btn-warning"
                    style={{ margin: "10px auto 10px auto" }}
                >
                    Reset Box
                </h3>

                {/* Toggle button for blocking keyboard operations (event listeners) */}
                <center
                    style={{
                        position: "absolute",
                        top: "0px",
                        right: "20px",
                        width: "60px",
                    }}
                >
                    <img
                        onClick={this.toggleAllListeners}
                        src={this.state.toggleImage}
                        style={{
                            width: "50px",
                            height: "50px",
                            marginBottom: "-10px",
                        }}
                        alt="toggle"
                    />
                    <font size="2">
                        <b>Keyboard</b>
                    </font>
                </center>
                {/* 
                <input
                    id="blockEvent"
                    value={this.state.blockEvent}
                    hidden
                    disabled
                /> */}

                <br />

                {/* Box holder */}
                <div className="row" id="boxHolder">
                    {this.state.boxes}
                </div>
            </div>
        );
    }
}

export default BoxContainer;
