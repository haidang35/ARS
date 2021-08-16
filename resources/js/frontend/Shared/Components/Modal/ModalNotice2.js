import React from "react";
import { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class ModalNotice2 extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { message } = this.props;
        return (
            <div className="modal-notice-2">
                <Dialog
                    open={message.length > 0}
                    onClose={this.props.onClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Thông báo từ hệ thống"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={this.props.onClose}
                            color="primary"
                            autoFocus
                        >
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
export default ModalNotice2;
