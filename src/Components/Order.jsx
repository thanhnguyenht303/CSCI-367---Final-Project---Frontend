import React, {useState, useEffect} from "react";
import uuid from "react-uuid";
import homeImage from "../images/Home.jpg";
import dayjs from "dayjs"
import {InputBase, Modal, TextField} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

const style = {
    container: {
      backgroundImage: `url(${homeImage})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      width: "100vw",
      height: "100vh",
    },
    nameField: {
      width: "60%",
      flex: 1,
      marginRight: "1rem",
      marginTop: "1rem",
      backgroundColor: "rgba(240,240,240,0.8)", 
      fontWeight: 900
    },
    phoneNumberField: {
      width: "38%",
      flex: 1,
      marginTop: "1rem",
      backgroundColor: "rgba(240,240,240,0.8)", 
      fontWeight: 900
    },
    addressField: {
      width: "100%",
      marginRight: "1rem",
      marginTop: "1rem",
      backgroundColor: "rgba(240,240,240,0.8)", 
      fontWeight: 900
    },
    deliveryTimeField: {
      width: "48%",
      marginRight: "1rem",
      marginTop: "1rem",
      backgroundColor: "rgba(240,240,240,0.8)", 
      fontWeight: 900,
      borderRadius: "5px"
    },
    pickupTimeField: {
      width: "48%",
      marginLeft: "1rem",
      marginTop: "1rem",
      backgroundColor: "rgba(240,240,240,0.8)", 
      fontWeight: 900,
      borderRadius: "5px"
    },
    packDesField: {
      width: "100%",
      marginRight: "1rem",
      marginTop: "1rem",
      backgroundColor: "rgba(240,240,240,0.8)", 
      fontWeight: 900
    },
};

const Order = () => {
  const root = style;

  const [id, setId] = useState(uuid());
  const [name, setName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [deliveryAddress, setDeliveryAddress] = useState();
  const [deliveryTime, setDeliveryTime] = useState(dayjs(new Date()));
  const [pickupAddress, setPickupAddress] = useState();
  const [pickupTime, setPickupTime] = useState(dayjs(new Date()));
  const [packageDescription, setPackageDescription] = useState();
  const [status, setStatus] = useState("Order placed")

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  const handleSubmit = (e) => {
    e.preventDefault()
    const order = {id, name, phoneNumber, deliveryAddress, deliveryTime, 
                  pickupAddress, pickupTime, packageDescription, status}
    setShowModal(true)
    fetch("http://localhost:8080/api/ordercheckout/add", {
      method: "POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(order)
    }).then(() => {})
    console.log(id)
  }


  return (
    <div style = {root.container}>
      <div className = "order-container">
        <div className = "item-1"></div>
        <div className = "item-2">
          <h1 className = "title"> MAKE DELIVERY</h1>
        </div>
        <div className = "item-3">
          <div className = "form" style = {{flex: 1, flexDirection: "row"}}>
            <InputBase 
              id = "outlined-basic" label = "Full Name" type = "text" placeholder = "Full Name" size = "medium" value = {name} style = {root.nameField}
              onChange = {(e) => setName(e.target.value)}  
            />
            <InputBase 
              id = "outlined-basic" label = "Phone Number" type = "text" placeholder = "Phone Number" size = "medium" value = {phoneNumber} 
              style = {root.phoneNumberField}
              onChange = {(e) => setPhoneNumber(e.target.value)}  
            />
            <InputBase 
              id = "outlined-basic" label = "Delivery Address" type = "text" placeholder = "Delivery Address" size = "medium" value={deliveryAddress}
              style = {root.addressField}
              onChange = {(e) => setDeliveryAddress(e.target.value)} 
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker label = "Delivery Date&Time"
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e)}
                renderInput={(params) => <TextField {...params} 
                style = {root.deliveryTimeField}/>}
              />
              <DateTimePicker label = "Pick up Date&Time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e)}
                renderInput={(params) => <TextField {...params} 
                style = {root.pickupTimeField}/>}
              />
            </LocalizationProvider>
            <InputBase
              id = "outlined-basic" label = "Pick up Address" type = "text" placeholder = "Pick up Address" size = "medium" value={pickupAddress}
              style = {root.addressField}
              onChange = {(e) => setPickupAddress(e.target.value)}
            />
            <InputBase 
              id = "outlined-basic" label = "Package Description" type = "text" placeholder = "Package Description" multiline rows = {4}
              style = {root.packDesField} 
              onChange = {(e) => setPackageDescription(e.target.value)}
            />
            <button className = "submit-btn" onClick = {handleSubmit}> Order </button>
          </div>
        </div>
      </div>
      <Modal open = {showModal}
            onClose = {handleClose}>
        <div className = "successful-screen">
            <h1> Thank You </h1> <br/>
            <h1> Order Successfully Placed </h1>
            <h2>It is your tracking number: {id}</h2> 
        </div>
      </Modal>
    </div>    
  )
}

export default Order;
