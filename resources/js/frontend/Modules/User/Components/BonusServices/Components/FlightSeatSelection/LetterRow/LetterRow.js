import { Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import "./LetterRow.scss";

class LetterRow extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div className="letter-row">
                    <div className="letter-box">
                        <div className="letters-left">
                            <Typography className="letter" variant="body1">
                                A
                            </Typography>
                            <Typography className="letter" variant="body1">
                                B
                            </Typography>
                            <Typography className="letter" variant="body1">
                                C
                            </Typography>
                        </div>
                        <div className="letter-space-number"></div>
                        <div className="letters-right">
                            <Typography className="letter" variant="body1">
                                D
                            </Typography>
                            <Typography className="letter" variant="body1">
                                E
                            </Typography>
                            <Typography className="letter" variant="body1">
                                F
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default LetterRow;
