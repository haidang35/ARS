import React from "react";
import { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

class ModalNotice extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleClose = () => {
        this.props.onClose();
    };

    render() {
        const { message } = this.props;
        return (
            <div>
                <Dialog
                    open={!!message}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Notification"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={this.handleClose}
                            color="primary"
                            autoFocus
                        >
                            Đồng ý
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
export default ModalNotice;
