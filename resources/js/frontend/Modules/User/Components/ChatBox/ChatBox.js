import React from "react";
import { Component } from "react";
import "./ChatBox.scss";
import { IoChatbubbles, IoCloseSharp } from "react-icons/io5";
import { Typography } from "@material-ui/core";
import AuthService from "../../../../Shared/Service/AuthService";
import { goTo } from "../../../../Helpers/Redirect/Redirect";
import { getTime } from "../../../../Helpers/DateTime/ConvertDateTime";

class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onShowChatBox: false,
            messages: [],
            newMessage: "",
        };
    }

    componentDidMount = () => {
        this.fetchMessages();
        this.receiveMessage();
    };

    onShowChatBox = () => {
        this.setState({
            onShowChatBox: !this.state.onShowChatBox,
        });
    };

    fetchMessages = () => {
        AuthService.fetchMyMessages().then((res) => {
            let messages = res.data;
            console.log(
                "🚀 ~ file: ChatBox.js ~ line 33 ~ ChatBox ~ AuthService.fetchMyMessages ~ messages",
                messages
            );
            messages = messages.sort((item1, item2) => {
                const sendTimeMs1 = new Date(item1.created_at);
                const sendTimeMs2 = new Date(item2.created_at);
                return sendTimeMs1.getTime() - sendTimeMs2.getTime();
            });
            this.setState({ messages });
        });
        console.log("ss", this.state.messages);
    };

    handleChangeNewMessage = (ev) => {
        this.setState({
            newMessage: ev.target.value,
        });
    };

    receiveMessage = () => {
        window.Echo.channel("ChatMessage").listen("MessageEvent", (event) => {
            let { messages } = this.state;
            const userId = AuthService.userId;
            if (event.message.user_received == userId) {
                messages.push(event.message);
                this.setState({ messages });
            }
        });
    };

    onSendNewMessage = (ev) => {
        const { newMessage } = this.state;
        if (ev.key === "Enter") {
            AuthService.sendMessage({
                message: newMessage,
                user_received: 1,
            }).then((res) => {
                let { messages } = this.state;
                messages.push(res.data);
                this.setState({ messages, newMessage: "" });
            });
        }
    };

    onClickSendNewMail = () => {
        const { newMessage } = this.state;
        AuthService.sendMessage({
            message: newMessage,
            user_received: 1,
        }).then((res) => {
            let { messages } = this.state;
            messages.push(res.data);
            this.setState({ messages, newMessage: "" });
        });
    };

    render() {
        const isLogged = !!AuthService.userId;
        const userId = AuthService.userId;
        const { messages } = this.state;
        return (
            <div>
                <div className="chat-box-user">
                    {!this.state.onShowChatBox ? (
                        <div
                            className="popup-chat"
                            onClick={this.onShowChatBox}
                        >
                            <IoChatbubbles className="chat-icon" />
                            <Typography variant="h6" className="title-chat">
                                Contact with us
                            </Typography>
                        </div>
                    ) : (
                        <div className="chat-box">
                            <div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card card-bordered">
                                            <div className="card-header">
                                                <h4 className="card-title">
                                                    <strong>Chat</strong>
                                                </h4>{" "}
                                                <button
                                                    className="btn btn-xs btn-secondary"
                                                    data-abc="true"
                                                    onClick={this.onShowChatBox}
                                                >
                                                    <IoCloseSharp />
                                                </button>
                                            </div>
                                            {isLogged ? (
                                                <div>
                                                    <div
                                                        className="ps-container ps-theme-default ps-active-y"
                                                        id="chat-content"
                                                    >
                                                        {messages.map(
                                                            (item) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            item.id
                                                                        }
                                                                        className={
                                                                            item.user_id !==
                                                                            userId
                                                                                ? "media media-chat "
                                                                                : "media media-chat media-chat-reverse"
                                                                        }
                                                                    >
                                                                        {item.user_id !==
                                                                        userId ? (
                                                                            <img
                                                                                className="avatar"
                                                                                src="https://img.icons8.com/color/36/000000/administrator-male.png"
                                                                                alt="..."
                                                                            />
                                                                        ) : (
                                                                            ""
                                                                        )}
                                                                        <div className="media-body">
                                                                            <p>
                                                                                {
                                                                                    item.message
                                                                                }
                                                                            </p>

                                                                            <p className="meta">
                                                                                <time
                                                                                    className="time"
                                                                                    dateTime={
                                                                                        2021
                                                                                    }
                                                                                >
                                                                                    {getTime(
                                                                                        item.created_at
                                                                                    )}
                                                                                </time>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                        )}

                                                        <div
                                                            className="ps-scrollbar-x-rail"
                                                            style={{
                                                                left: 0,
                                                                bottom: 0,
                                                            }}
                                                        >
                                                            <div
                                                                className="ps-scrollbar-x"
                                                                tabIndex={0}
                                                                style={{
                                                                    left: 0,
                                                                    width: 0,
                                                                }}
                                                            />
                                                        </div>
                                                        <div
                                                            className="ps-scrollbar-y-rail"
                                                            style={{
                                                                top: 0,
                                                                height: 0,
                                                                right: 2,
                                                            }}
                                                        >
                                                            <div
                                                                className="ps-scrollbar-y"
                                                                tabIndex={0}
                                                                style={{
                                                                    top: 0,
                                                                    height: 2,
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="publisher bt-1 border-light">
                                                        {" "}
                                                        <img
                                                            className="avatar avatar-xs"
                                                            src="https://img.icons8.com/color/36/000000/administrator-male.png"
                                                            alt="..."
                                                        />{" "}
                                                        <input
                                                            className="publisher-input"
                                                            type="text"
                                                            placeholder="Write something"
                                                            value={
                                                                this.state
                                                                    .newMessage
                                                            }
                                                            onChange={
                                                                this
                                                                    .handleChangeNewMessage
                                                            }
                                                            onKeyDown={
                                                                this
                                                                    .onSendNewMessage
                                                            }
                                                        />{" "}
                                                        <span className="publisher-btn file-group">
                                                            {" "}
                                                            <i className="fa fa-paperclip file-browser" />{" "}
                                                            <input type="file" />{" "}
                                                        </span>{" "}
                                                        <a
                                                            className="publisher-btn"
                                                            href="#"
                                                            data-abc="true"
                                                        >
                                                            <i className="fa fa-smile" />
                                                        </a>{" "}
                                                        <button
                                                            className="publisher-btn text-info"
                                                            onClick={
                                                                this
                                                                    .onClickSendNewMail
                                                            }
                                                            data-abc="true"
                                                        >
                                                            <i className="fa fa-paper-plane" />
                                                        </button>{" "}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="login-notice">
                                                    <Typography
                                                        variant="h6"
                                                        className="notice"
                                                    >
                                                        Vui lòng đăng nhập để có
                                                        thể liên hệ với chúng
                                                        tôi
                                                    </Typography>
                                                    <button
                                                        onClick={() =>
                                                            goTo("login")
                                                        }
                                                        className="btn btn-info btn-login"
                                                    >
                                                        Login
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
export default ChatBox;
