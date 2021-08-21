import { Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import { URL_IMAGE_SUPPORT } from "../../../../../../Constances/const";
import "./SupportInfo.scss";

class SupportInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div className="support-info">
                    <div className="wrap-container">
                        {/* <Typography variant="h4" className="title">
                            Support
                        </Typography> */}
                        <div className="row">
                            <div className="col-md-4">
                                <div className="support-item">
                                    <div className="img-box">
                                        <img
                                            src={
                                                URL_IMAGE_SUPPORT +
                                                "support1.svg"
                                            }
                                            className="img-support"
                                        />
                                    </div>

                                    <div className="content">
                                        <Typography variant="h6">
                                            Chúng tôi luôn sẵn sàng hỗ trợ
                                        </Typography>
                                        <Typography variant="body1">
                                            Xem những nơi bạn có thể đến du lịch
                                            ngay bây giờ và tìm những ưu đãi tốt
                                            nhất cho hàng nghìn chuyến bay,
                                            khách sạn và các lựa chọn thuê xe
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="support-item">
                                    <div className="img-box">
                                        <img
                                            src={
                                                URL_IMAGE_SUPPORT +
                                                "support2.svg"
                                            }
                                            className="img-support img-support-2"
                                        />
                                    </div>

                                    <div className="content">
                                        <Typography variant="h6">
                                            An tâm lên kế hoạch
                                        </Typography>
                                        <Typography variant="body1">
                                            Đi trước một bước với vé máy bay
                                            linh hoạt, chính sách hủy miễn phí
                                            khi đặt phòng khách sạn cũng như
                                            thuê xe hơi, và phòng ở sạch sẽ nhất
                                            ở khắp mọi nơi.
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="support-item">
                                    <div className="img-box">
                                        <img
                                            src={
                                                URL_IMAGE_SUPPORT +
                                                "support3.svg"
                                            }
                                            className="img-support img-support-3"
                                        />
                                    </div>

                                    <div className="content">
                                        <Typography variant="h6">
                                            Đơn giản như đan rổ
                                        </Typography>
                                        <Typography variant="body1">
                                            Với tiêu chí 2 không của chúng tôi
                                            là không phí ngầm và không lừa đảo,
                                            bạn chẳng phải lo mất tiền oan vì
                                            mọi khoản chi đều rõ như ban ngày cả
                                            rồi. Hãy cứ ung dung chờ ngày đi
                                            thôi.
                                        </Typography>
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
export default SupportInfo;
