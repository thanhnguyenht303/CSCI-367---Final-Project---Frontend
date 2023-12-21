import { InputBase, Modal } from "@mui/material";
import React, {useEffect, useState} from "react";
import {FaSearchLocation} from "react-icons/fa";

const style = {
    trackingField: {
        width: "100%",
        marginLeft: "1rem",
        marginRight: "1rem",
        backgroundColor: "rgba(240,240,240,0.8)", 
        fontWeight: 800
    }
}

const Tracking = () => {

    const root = style;

    const [trackingNum, setTrackingNum] = useState();
    const [order, setOrder] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [deliveryAddress, setDeliveryAddress] = useState([]);
    const [pickupAddress, setPickupAddress] = useState([]);
    const [status, setStatus] = useState([]);

    const [detail, setDetail] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8080/api/orders/findall")
        .then((res) => res.json())
        .then((result) => setOrder(result))
    },[]);

    useEffect(() => {
        fetch("http://localhost:8080/api/customer/findall")
        .then((res) => res.json())
        .then((result) => setCustomer(result))
    },[]);

    useEffect(() => {
        fetch("http://localhost:8080/api/address/findall")
        .then((res) => res.json())
        .then((result) => setPickupAddress(result))
    },[]);

    useEffect(() => {
        fetch("http://localhost:8080/api/address/findall")
        .then((res) => res.json())
        .then((result) => setDeliveryAddress(result))
    },[]);

    useEffect(() => {
        fetch("http://localhost:8080/api/status/findall")
        .then((res) => res.json())
        .then((result) => setStatus(result))
    },[]);


    const handleSubmit = () => {
        setDetail(true);
    };

    const handleClose = () => setDetail(false);

    return (
        <>
            <div className = "tracking-search">
                <h1 className = "title">TRACKING YOUR ORDER</h1>
                <div></div>
                <InputBase id = "outlined-basic" label = "Tracking Number" placeholder = "Tracking Number" type = "text" value = {trackingNum} 
                style = {root.trackingField}
                onChange = {(e) => setTrackingNum(e.target.value)}
                />
                <FaSearchLocation style = {{fontSize: "3rem", fontWeight: 800, cursor:"pointer"}} onClick = {handleSubmit}/>
            </div>
            <Modal open = {detail}
                    onClose = {handleClose}>
                <div className = "detail-screen">
                    <table>
                        <tr>
                            <th>Customer Name</th>
                            <th>Phone Number</th>
                            <th>Pick up Address</th>
                            <th>Pick up Time</th>
                            <th>Delivery Address</th>
                            <th>Delivery Time</th>
                            <th>Package Description</th>
                            <th>Status</th>
                        </tr>
                        {order.map(data => (
                            data.id === trackingNum ? (
                        <tr>
                            <th>{customer.map(res => (res.id === data.customerId) ? (
                                <th>{res.name}</th>
                            ) : (""))}</th>
                            <th>{customer.map(res => (res.id === data.customerId) ? (
                                <th>{res.phoneNumber}</th>
                            ) : (""))}</th>
                            <th>{pickupAddress.map(res => (res.id === data.pickupId) ? (
                                <th>{res.address}</th>
                            ) : (""))}</th>
                            <th>{data.pickupTime}</th>
                            <th>{deliveryAddress.map(res => (res.id === data.deliveryId) ? (
                                <th>{res.address}</th>
                            ) : (""))}</th>
                            <th>{data.deliveryTime}</th>
                            <th>{data.packageDescription}</th>
                            <th>{status.map(res => (res.id === data.statusId) ? (
                                <th>{res.status}</th>
                            ) : (""))}</th>
                        </tr>
                            ) : ("")
                        ))}
                    </table>
                </div>
            </Modal>
        </>
    )
}

export default Tracking