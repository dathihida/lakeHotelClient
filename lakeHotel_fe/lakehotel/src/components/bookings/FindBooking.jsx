import React, { useState } from 'react'
import { cancelBooking, getBookingByConfirmationCode } from '../utils/ApiFunctions'

const FindBooking = () => {
    const[confirmationCode, setConfirmationCode] = useState("")
    const[error, setError] = useState(null)
    const[isLoading, setIsLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const[bookingInfo, setBookingInfo] = useState({
        id:"",
        room:{id:""},
        bookingConfirmationCode:"",
        roomNumber:"",
        checkInDate: "",
        checkOutDate: "",
        guestFullName: "",
        guestEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalNumOfGuest: ""
    })

    const[isDelete, setIsDelete] = useState(false)

    const clearnBookingInfo = {
        id:"",
        room:{id:""},
        bookingCofirmationCode:"",
        roomNumber:"",
        checkInDate: "",
        checkOutDate: "",
        guestFullName: "",
        guestEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalNumOfGuest: "",
    }

    const handleInputChange = (e) =>{
        setConfirmationCode(e.target.value)
    }

    const handleFormSubmit = async(e) =>{
        e.preventDefault()
        setIsLoading(true)
        try {
            const data = await getBookingByConfirmationCode(confirmationCode)
            setBookingInfo(data)
            setError(null)
            console.log("confirmationcode",data)
        } catch (error) {
            setBookingInfo(clearnBookingInfo)
            if(error.response && error.response.status === 404){
                setError(error.response.data.message)
                console.log("error",error.data) 
            }else{
                setError(error.response)
            }
        }
        setTimeout(() =>{
            setIsLoading(false)
        }, 2000)
    }

    const handleBookingCancellation = async (bookingId) =>{
        try {
            await cancelBooking(bookingInfo.bookingId)
            setIsDelete(true)
            setSuccessMessage("Booking has been cancelled successfully!")
            setBookingInfo(clearnBookingInfo)
            setConfirmationCode("")
            setError("")
        } catch (error) {
            setError(error.message)
        }
        setTimeout(() => {
			setSuccessMessage("")
			setIsDelete(false)
		}, 2000)
    }

  return (
    <>
        <div className="container mt-5 d-flex flex-column 
        justify-content-center align-items-center">
            <h2>Find My Booking</h2>
            <form onSubmit={handleFormSubmit} className="col-md-6">
                <div className="input-group mb-3">
                    <input 
                        className="form-control" 
                        id="confirmationCode"
                        name="confirmationCode"
                        value={confirmationCode}
                        onChange={handleInputChange}
                        placeholder="Enter the booking confirmation code"
                    />

                    <button className="btn btn-hotel input-group-text">
                        Find booking
                    </button>
                </div>
            </form>
            {isLoading ? (
                <div>Finding booking ...</div>
            ): error ? (
                <div className="text-danger">
                    Error: {error}
                </div>
            ): bookingInfo.bookingConfirmationCode ? (
                <div className="col-md-6 mt-4 mb-5">
                    <h3>Booking Information</h3>
                    <p>Booking Confirmation Code: {bookingInfo.bookingConfirmationCode}</p>
                    <p>Booking Id: {bookingInfo.bookingId}</p>
                    <p>Room Number: {bookingInfo.room.id}</p>
                    <p>Check-in Date: {bookingInfo.checkInDate}</p>
                    <p>Check-out Date: {bookingInfo.checkOutDate}</p>
                    <p>Full Name: {bookingInfo.guestFullName}</p>
                    <p>Email Address: {bookingInfo.guestEmail}</p>
                    <p>Adults: {bookingInfo.numOfAdults}</p>
                    <p>Children: {bookingInfo.numOfChildren}</p>
                    <p>Total guest: {bookingInfo.totalNumOfGuest}</p>

                    {!isDelete && (
                        <button
                            className="btn btn-danger"
                            onClick={ ()=> handleBookingCancellation(bookingInfo.bookingId)}
                        >
                            Cancel Booking
                        </button>
                    )}
                </div>
            ):(
                <div>Finding booking...</div>
            )}

            {isDelete && (
                <div className="alter alter-success mt-3" role="alert">
                    {successMessage}
                </div>
            )}
        </div>
    </>
  )
}

export default FindBooking
