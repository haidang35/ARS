<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
    <style>
        body {
            margin: 0;
            padding: 0;
            text-align: center;
        }

        .email {
            line-height: 6px;
            background-image: url("https://dulichvietnam.com.vn/data/News/v%C3%A9-may-bay.jpg");
            background-size: cover;
            background-repeat: no-repeat;
            padding: 2rem;

        }

        .email-content {}

        .col-sm-6 {
            background-color: white;
        }

        .noti-booked {}

        .noti-booked h3 {
            color: #5cb85c;
            font-weight: 700;
            font-family: system-ui;
        }

        .noti-booked h4 {
            font-weight: 600;
            color: #a7a1a173;
            letter-spacing: 1px;
        }

        .info-flight {
            margin-top: 30px;
        }

        .info-flight h4 {
            font-weight: 700;
        }

        .info-flight h5 {
            color: #9d9d9d;
        }

        .info-destination {
            padding: 60px;
        }

        .info-destination h3 {
            font-weight: 700;
        }

        .info-destination h5 {
            color: #b4b3b1;
            font-size: 16px;
        }

        .info-payment {
            background-color: #e5e5e5;
            padding: 41px;
        }

        .into-money-title {
            font-size: 19px;
            font-weight: 500;
            text-align: left;
        }

        .into-money {
            font-size: 19px;
            font-weight: 500;
            color: #5cb85c;
        }

    </style>
</head>

<body>
    <div class="email">
        <div class="container">
            <div class="email-content">
                <div class="row">
                    <div class="col-sm-3"></div>
                    <div class="col-sm-6" style="padding: 2rem">
                        <div class="noti-booked">
                            <h3>FLIGHT BOOKED</h3>
                            <h4>ID Q1234567890</h4>
                            <b>Sunday. June 20.</b>
                        </div>
                        <div class="info-flight">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="info-airline">
                                        <h5>Airline</h5>
                                        <ul
                                            style="display: flex; list-style: none; justify-content: center; align-content: center; padding: 0">
                                            <li>
                                                <h4>Vietnam Airline</h4>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                                <div class="col-md-4"
                                    style="border-right: 1px solid #e8e8e8;border-left: 1px solid #e8e8e8">
                                    <h5>Carbin Class</h5>
                                    <h4>Economy</h4>
                                </div>
                                <div class="col-md-4">
                                    <div class="info-airline" style="margin-right: -32px">
                                        <h5>Flight Code</h5>
                                        <ul style="display: flex; list-style: none; justify-content: center; align-content: center; padding: 0"">
                                            <li ><h4>VNA444</h4></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
    
                        </div>
                        <div class=" info-destination">
                                            <div class="row">
                                                <div class="col-md-4" style="border: 1px solid #e8e8e8">
                                                    <h5>Đà Nẵng</h5>
                                                    <h3 style="text-align: center">DNA</h3>
                                                    <h5 style="color: black; font-weight: 600">13:00 PM</h5>
                                                </div>
                                                <div class="col-md-4">
                                                    <img src="" />
                                                    <div style="border-bottom: 2px solid #e8e8e8;margin-top:15px"></div>

                                                </div>
                                                <div class="col-md-4" style="border: 1px solid #e8e8e8">
                                                    <h5>Hà Nội</h5>
                                                    <h3 style="text-align: center">HNA</h3>
                                                    <h5 style="color: black; font-weight: 600">16:00 PM</h5>
                                                </div>
                                            </div>
                                    </div>
                                    <div class="info-payment">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th>Hành khách</th>
                                                            <th>Số lượng</th>
                                                            <th>Giá vé</th>
                                                            <th>Tổng tiền</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Người lớn</td>
                                                            <td>1</td>
                                                            <td>500000</td>
                                                            <td>500000</td>
                                                        </tr>
                                                        <tr>
                                                            <td class="into-money-title" colspan="3">Thành tiền</td>
                                                            <td class="into-money">500000</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-3"></div>
                            </div>
                        </div>

                    </div>
                </div>
</body>

</html>
