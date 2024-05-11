import React, { useEffect, useState } from 'react'
import BookingForm from './BookingForm'
import { getRoomById } from '../utils/ApiFunctions'
import { useParams } from 'react-router-dom'
import {FaCar, FaParking, FaTshirt, FaTv, FaUtensils, FaWineGlassAlt, FaWifi} from 'react-icons/fa'
import RoomCarousel from '../common/RoomCarousel'

const Checkout = () => {

  const[error, setError] = useState("")
  const[isLoading, setisLoading] = useState(true)
  const[roomInfo, setRoomInfo] = useState({photo:"", roomType:"", roomPrice:""})
  
  const{roomId} = useParams()
  
  useEffect(() =>{
    setTimeout(() =>{
      getRoomById(roomId).then((response) =>{
        setRoomInfo(response)
        setisLoading(false)
        console.log(response)
      }).catch((error) =>{
        setError(error)
        setisLoading(false)
      })
    }, 2000)
  },[roomId])

  return (
    <div>
      <section className="container">
        <div className="row flex-column flex-md-row align-items-center">
          <div className="col-md-4 mt-5 mb-5">
            {isLoading ? (
              <p>Loading room information</p>
            ): error ? (
              <p>{error}</p>
            ):(
              <div className="room-info">
                <img
                  src={`data:image/png; base64, ${roomInfo.photo}`}
                  alt="Room photo"
                  style={{width:"100%", height:"200px"}}
                />

                <table>
                  <tbody>
                    <tr>
                      <th>Room Type: </th>
                      <th>${roomInfo.roomType}</th>
                    </tr>

                    <tr>
                      <th>Room Price: </th>
                      <th>${roomInfo.roomPrice}</th>
                    </tr>

                    <tr>
                      <td>Room Service</td>
                      <td>
                        <ul>
                          <li>
                            <FaWifi/> Wifi
                          </li>
                          <li>
                            <FaTv/> Nextfilx Premium
                          </li>
                          <li>
                            <FaUtensils/> Breakfast
                          </li>
                          <li>
                            <FaWineGlassAlt/> Mini bar refreshment
                          </li>
                          <li>
                            <FaCar/> Car Service
                          </li>
                          <li>
                            <FaParking/> Parking Space
                          </li>
                          <li>
                            <FaTshirt/> Laundry
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

          </div>

          <div className="col-md-8">
            <BookingForm/> 
          </div>
        </div>
        <div className="container">
          <RoomCarousel/>
        </div>

      </section>
    </div>
  )
}

export default Checkout
