import {
    Button,
    Card,
    Dialog,
    FormGroup,
    TextField,
    Typography,
} from "@material-ui/core";
import React from "react";
import { Component } from "react";
import "./ListDestination.scss";

class ListDestination extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { onOpen, handleClose } = this.props;
        return (
            <div>
                <Dialog open={onOpen} onClose={handleClose}>
                    <div className="list-destination">
                        <Card className="card-content">
                            <Typography className="title">
                                Chọn điểm đi
                            </Typography>
                            <FormGroup>
                                <TextField
                                    id="outlined-basic"
                                    label="Nhập điểm đi"
                                    variant="outlined"
                                    className="input-field"
                                />

                            </FormGroup>

                            <div className="choose-country">
                                <Button variant="contained" color="primary">
                                    Việt Nam
                                </Button>
                            </div>
                            <Card className="choose-destination">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <ul className="list-destination">
                                            <li className="item">
                                                Hà Nội (HAN)
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </Card>
                        </Card>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default ListDestination;
