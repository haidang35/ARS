import React from "react";
import { Component } from "react";
import "./Notification.scss";
import NotificationService from "./Shared/NotificationService";
import { IoNotificationsCircle } from "react-icons/io5";

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noticeList: [],
            newNotice: {},
        };
    }

    componentDidMount() {
        this.getNotificationList();
        this.getNewNotificationRealTime();
    }

    getNotificationList = () => {
        NotificationService.getNotificationList().then((res) => {
            this.setState({
                noticeList: res.data,
            });
        });
    };

    getNewNotificationRealTime = () => {
        window.Echo.channel("Notification").listen(
            "NotificationEvent",
            (event) => {
                let { noticeList } = this.state;
                noticeList.push(event.message);
                this.setState({
                    newNotice: event.message,
                    noticeList,
                });
            }
        );
    };

    render() {
        const { noticeList } = this.state;
        return (
            <div>
                <div className="notification-admin">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Notifications</h4>
                        </div>
                        <div className="card-content">
                            <div className="card-body">
                                <div className="notice-list">
                                    <div className="row">
                                        <div className="col-md-2"></div>
                                        <div className="col-md-9">
                                            {noticeList.map((item) => {
                                                return (
                                                    <div
                                                        key={item.id}
                                                        className="alert alert-info notice-item"
                                                    >
                                                        <IoNotificationsCircle className="notice-icon" />
                                                        <p className="notice-content">
                                                            {item.content}
                                                        </p>
                                                    </div>
                                                );
                                            })}
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
export default Notification;
