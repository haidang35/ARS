import React from "react";
import { Component } from "react";
import "./Notification.scss";
import NotificationService from "./Shared/NotificationService";
import { IoNotificationsCircle } from "react-icons/io5";
import { Typography } from "@material-ui/core";
import { MdNotificationsActive } from "react-icons/md";
import { IoNotificationsSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noticeList: [],
            newNotices: {},
            viewNoticeStatus: 0,
        };
    }

    componentDidMount() {
        this.getNewNotifications();
        this.getNewNotificationRealTime();
        this.updateReadNotification();
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
                console.log("event", event.message);
                let { noticeList } = this.state;
                noticeList.push(event.message);
                this.setState({
                    newNotices: event.message,
                    noticeList,
                });
            }
        );
    };

    updateReadNotification = () => {
        NotificationService.updateNotification();
    };

    getNewNotifications = () => {
        NotificationService.getNotificationList().then((res) => {
            let noticeList = res.data;
            const now = new Date();
            noticeList = noticeList.filter((item) => {
                const createdAt = new Date(item.created_at);
                if (
                    now.getDate() == createdAt.getDate() &&
                    now.getMonth() == createdAt.getMonth() &&
                    now.getFullYear() == createdAt.getFullYear() &&
                    now.getHours() - createdAt.getHours() <= 12
                ) {
                    return item;
                }
            });
            this.setState({ noticeList });
        });
    };

    checkNewNotification = (data) => {
        const now = new Date();
        const createdAt = new Date(data.created_at);
        if (
            now.getDate() == createdAt.getDate() &&
            now.getMonth() == createdAt.getMonth() &&
            now.getFullYear() == createdAt.getFullYear() &&
            now.getHours() - createdAt.getHours() <= 12
        ) {
            return true;
        }
        return false;
    };

    onGetNewNotice = () => {
        this.setState({
            viewNoticeStatus: 0,
        });
        this.getNewNotifications();
    };

    onGetAllNotice = () => {
        this.setState({
            viewNoticeStatus: 1,
        });
        this.getNotificationList();
    };

    render() {
        let { noticeList, viewNoticeStatus } = this.state;
        noticeList = noticeList.sort((item1, item2) => {
            const createdItem1 = new Date(item1.created_at);
            const createdItem2 = new Date(item2.created_at);
            return createdItem2.getTime() - createdItem1.getTime();
        });

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
                                        <div className="col-md-2">
                                            <div
                                                className={
                                                    viewNoticeStatus == 0
                                                        ? "item-filter item-filter-active"
                                                        : "item-filter"
                                                }
                                                onClick={this.onGetNewNotice}
                                            >
                                                <MdNotificationsActive className="icon-notice" />
                                                <Typography
                                                    variant="body1"
                                                    className="filter-title"
                                                >
                                                    New
                                                </Typography>
                                            </div>
                                            <div
                                                className={
                                                    viewNoticeStatus == 1
                                                        ? "item-filter item-filter-active"
                                                        : "item-filter"
                                                }
                                                onClick={this.onGetAllNotice}
                                            >
                                                <IoNotificationsSharp className="icon-notice" />
                                                <Typography
                                                    variant="body1"
                                                    className="filter-title"
                                                >
                                                    All
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className="col-md-10">
                                            {noticeList.length === 0 ? (
                                                <Typography variant="h6">
                                                    There is no notice.
                                                </Typography>
                                            ) : (
                                                ""
                                            )}
                                            {noticeList.map((item) => {
                                                return (
                                                    <Link
                                                        key={item.id}
                                                        to={`/admin/bookings/${item.data}`}
                                                        style={{
                                                            textDecoration:
                                                                "none",
                                                        }}
                                                    >
                                                        <div className="alert alert-info notice-item">
                                                            <IoNotificationsCircle className="notice-icon" />
                                                            <p className="notice-content">
                                                                {item.content}
                                                            </p>
                                                            <div className="notice-status">
                                                                {this.checkNewNotification(
                                                                    item
                                                                ) ? (
                                                                    <button className="btn btn-sm btn-warning">
                                                                        New
                                                                    </button>
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </div>
                                                        </div>
                                                    </Link>
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
