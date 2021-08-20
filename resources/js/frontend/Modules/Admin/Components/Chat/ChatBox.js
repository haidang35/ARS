import React from "react";
import { Component } from "react";
import "./ChatBox.scss";
import AuthService from "../../../../Shared/Service/AuthService";
import {
    convertMonthAndDate,
    getTime,
} from "../../../../Helpers/DateTime/ConvertDateTime";
import { Typography } from "@material-ui/core";

class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            send_message: "",
            listUser: [],
            userReceived: "",
            userChat: {},
        };
    }

    componentDidMount() {
        // this.fetchMyMessages();
        this.receiveMessage();
        this.getListPeopleChat();
    }

    fetchMyMessages = () => {
        AuthService.fetchMyMessages().then((res) => {
            this.setState({
                messages: res.data,
            });
        });
    };

    getListPeopleChat = () => {
        AuthService.getListPeopleChat().then((res) => {
            this.setState({
                listUser: res.data,
            });
            this.onChoosePersonChat(res.data[0]);
        });
    };

    handleChangeMessage = (ev) => {
        const { name, value } = ev.target;
        this.setState({
            [name]: value,
        });
    };

    sendMessage = (ev) => {
        if (ev.key === "Enter") {
            let { send_message, messages, userReceived } = this.state;
            AuthService.sendMessage({
                message: send_message,
                user_received: userReceived,
            }).then((res) => {
                messages.push(res.data);
                this.setState({ messages, send_message: "" });
            });
        }
    };

    onClickSendMessage = () => {
        let { send_message, messages, userReceived } = this.state;
        AuthService.sendMessage({
            message: send_message,
            user_received: userReceived,
        }).then((res) => {
            messages.push(res.data);
            this.setState({ messages, send_message: "" });
        });
    };

    receiveMessage = () => {
        window.Echo.channel("ChatMessage").listen("MessageEvent", (event) => {
            let { messages, listUser, userReceived } = this.state;
            const userId = AuthService.adminId;
            if (
                event.message.user_received == userId &&
                event.message.user_id === userReceived
            ) {
                messages.push(event.message);
            }
            let checkUnique = true;
            listUser.forEach((item) => {
                if (
                    event.message.user_id == item.id ||
                    event.message.user_id == userId
                ) {
                    checkUnique = false;
                }
            });
            if (checkUnique) {
                listUser.push(event.message.user_incoming);
            }
            this.setState({ messages, listUser });
        });
    };

    onChoosePersonChat = (user) => {
        this.setState({
            userReceived: user.id,
        });
        AuthService.getIncomingMessage(user.id).then((res) => {
            let { messages } = this.state;
            messages = res.data;
            messages = messages.sort((item1, item2) => {
                const sendTimeMs1 = new Date(item1.created_at);
                const sendTimeMs2 = new Date(item2.created_at);
                return sendTimeMs1.getTime() - sendTimeMs2.getTime();
            });
            this.setState({ messages, userChat: user });
        });
    };

    render() {
        const { messages, listUser, userReceived, userChat } = this.state;
        const userId = AuthService.adminId;
        return (
            <div>
                <div className="chat-box-admin">
                    <div className="card">
                        <div className="card-header">
                            <h3 className=" text-center">Messaging</h3>
                        </div>
                        <div className="card-body">
                            <div className="card-content">
                                <div className="messaging">
                                    <div className="inbox_msg">
                                        <div className="inbox_people">
                                            <div className="headind_srch">
                                                <div className="recent_heading">
                                                    <h4>Recent</h4>
                                                </div>
                                                <div className="srch_bar">
                                                    <div className="stylish-input-group">
                                                        <input
                                                            type="text"
                                                            className="search-bar"
                                                            placeholder="Search"
                                                        />
                                                        <span className="input-group-addon">
                                                            <button type="button">
                                                                {" "}
                                                                <i
                                                                    className="fa fa-search"
                                                                    aria-hidden="true"
                                                                />{" "}
                                                            </button>
                                                        </span>{" "}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="inbox_chat">
                                                {listUser.map((item) => {
                                                    return (
                                                        <div
                                                            onClick={() =>
                                                                this.onChoosePersonChat(
                                                                    item
                                                                )
                                                            }
                                                            key={item.id}
                                                            className={
                                                                userReceived ==
                                                                item.id
                                                                    ? "chat_list active_chat"
                                                                    : "chat_list"
                                                            }
                                                        >
                                                            <div className="chat_people">
                                                                <div className="chat_img">
                                                                    {" "}
                                                                    <img
                                                                        src="https://ptetutorials.com/images/user-profile.png"
                                                                        alt="sunil"
                                                                    />{" "}
                                                                </div>
                                                                <div className="chat_ib">
                                                                    <h5>
                                                                        {
                                                                            item.name
                                                                        }{" "}
                                                                        <span className="chat_date">
                                                                            Dec
                                                                            25
                                                                        </span>
                                                                    </h5>
                                                                    <p></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className="mesgs">
                                            <div className="side-bar-msg">
                                                <div className="chat_img">
                                                    {" "}
                                                    <img
                                                        src="https://ptetutorials.com/images/user-profile.png"
                                                        alt="sunil"
                                                    />{" "}
                                                </div>
                                                <Typography
                                                    className="user-chat-name"
                                                    variant="h6"
                                                >
                                                    {userChat.name}
                                                </Typography>
                                            </div>
                                            <div className="msg_history">
                                                {messages.map((item) => {
                                                    return (
                                                        <div
                                                            key={item.id}
                                                            className={
                                                                item.user_id ===
                                                                userId
                                                                    ? "outgoing_msg"
                                                                    : "incoming_msg"
                                                            }
                                                        >
                                                            {item.user_id !==
                                                            userId ? (
                                                                <div>
                                                                    <div className="incoming_msg_img">
                                                                        {" "}
                                                                        <img
                                                                            src="https://ptetutorials.com/images/user-profile.png"
                                                                            alt="sunil"
                                                                        />{" "}
                                                                    </div>
                                                                    <div className="received_msg">
                                                                        <div className="received_withd_msg">
                                                                            <p>
                                                                                {
                                                                                    item.message
                                                                                }
                                                                            </p>
                                                                            <span className="time_date">
                                                                                {" "}
                                                                                {getTime(
                                                                                    item.created_at
                                                                                )}

                                                                                |{" "}
                                                                                {convertMonthAndDate(
                                                                                    item.created_at
                                                                                )}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="sent_msg">
                                                                    <p>
                                                                        {
                                                                            item.message
                                                                        }
                                                                    </p>
                                                                    <span className="time_date">
                                                                        {" "}
                                                                        {getTime(
                                                                            item.created_at
                                                                        )}{" "}
                                                                        |{" "}
                                                                        {convertMonthAndDate(
                                                                            item.created_at
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div className="type_msg">
                                                <div className="input_msg_write">
                                                    <input
                                                        type="text"
                                                        name="send_message"
                                                        className="write_msg"
                                                        placeholder="Type a message"
                                                        value={
                                                            this.state
                                                                .send_message
                                                        }
                                                        onChange={
                                                            this
                                                                .handleChangeMessage
                                                        }
                                                        onKeyDown={
                                                            this.sendMessage
                                                        }
                                                    />
                                                    <button
                                                        onClick={
                                                            this
                                                                .onClickSendMessage
                                                        }
                                                        className="msg_send_btn"
                                                        type="button"
                                                    >
                                                        <i
                                                            className="fa fa-paper-plane-o"
                                                            aria-hidden="true"
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ChatBox;
