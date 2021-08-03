import {
    Button,
    Card,
    Dialog,
    FormGroup,
    Grid,
    List,
    ListItem,
    ListItemText,
    Popper,
    TextField,
    Typography,
} from "@material-ui/core";
import React from "react";
import { Component } from "react";
import "./ListDestination.scss";

class ListDestination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: "",
            destination: "",
            departure: ""
        };
    }

    handleSearchDestination = (ev) => {
        this.setState({
            searchValue: ev.target.value,
        });
    };

    onChooseDeparture = (data) => {
        this.props.onChoose(data);
    }

    render() {
        const { searchValue } = this.state;
        let { onOpen, handleClose, data, title, inputLabel } = this.props;
        let searchResultList = data.filter((item) => {
            return (
                item.city.toLowerCase().indexOf(searchValue.toLowerCase()) !==
                    -1 ||
                item.airport_code
                    .toLowerCase()
                    .indexOf(searchValue.toLowerCase()) !== -1 ||
                item.airport_name
                    .toLowerCase()
                    .indexOf(searchValue.toLowerCase()) !== -1
            );
        });
        if (searchValue == "") searchResultList = [];
        return (
            <div>
                <Dialog open={onOpen} onClose={handleClose}>
                    <div className="list-destination">
                        <Card className="card-content">
                            <Typography className="title">
                                {title}
                            </Typography>
                            <FormGroup>
                                <TextField
                                    id="outlined-basic"
                                    name="searchValue"
                                    placeholder={inputLabel}
                                    variant="outlined"
                                    className="input-field "
                                    value={searchValue}
                                    onChange={this.handleSearchDestination}
                                />
                                <List
                                    component="nav"
                                    aria-label="secondary mailbox folders"
                                    className="search-result-list "
                                >
                                    {searchResultList.map((item) => {
                                        return (
                                            <ListItem
                                                button
                                                className="list-item "
                                            >
                                                <ListItemText
                                                    primary={
                                                        item.airport_code +
                                                        "  " +
                                                        item.airport_name +
                                                        ", " +
                                                        item.city +
                                                        ", " +
                                                        item.country
                                                    }
                                                />
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </FormGroup>

                            <div className="choose-country">
                                <Button variant="contained" color="primary">
                                    Việt Nam
                                </Button>
                            </div>
                            <Card className="choose-destination">
                                <Grid container className="list-destination">
                                    {data.map((item) => {
                                        return (
                                            <Grid onClick={() => this.onChooseDeparture(item)} key={item.id} item xs={4}>
                                                <Typography className="item">
                                                    {item.city +
                                                        ` (${item.airport_code}) `}
                                                </Typography>
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </Card>
                        </Card>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default ListDestination;
