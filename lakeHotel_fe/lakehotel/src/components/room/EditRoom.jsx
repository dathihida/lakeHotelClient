import React, { useEffect, useState } from 'react'
import { getRoomById, updateRoom } from '../utils/ApiFunctions'
import { Link, useParams } from 'react-router-dom'

const EditRoom = () => {

  const [room, setRoom] = useState({
    photo : null,
    roomType : "",
    roomPrice: ""
  })

  const[imagePreview, setImagePreview] = useState("")
  const[succseMessage, setSuccseMessage] = useState("")
  const[errorMessage, setErrorMessage] = useState("")
  const{roomId} = useParams()

  const handleImageChange = (e)=>{
    const selectedImage = e.target.files[0]
    setRoom({...room, photo: selectedImage})
    setImagePreview(URL.createObjectURL(selectedImage))
  }

  const handleInputChange = (event) =>{
    const {name, value} = event.target
    setRoom({...room, [name]: value})
  }

  useEffect(() =>{
    const fetchRoom = async () =>{
      try {
        const roomData = await getRoomById(roomId)
        setRoom(roomData)
        setImagePreview(roomData.photo)
      } catch (error) {
        console.error(error)
      }
    }
    fetchRoom()
  }, [roomId])

  const handleSubmit = async (event) =>{
    event.preventDefault()
    try {
      const response = await updateRoom(roomId, room)
      if(response.status === 200){
        setSuccseMessage("Room update successfully")
        const updateRoomData = await getRoomById(roomId)
        setRoom(updateRoomData)
        setImagePreview(updateRoomData.photo)
        setErrorMessage("")
      }else{
        setErrorMessage("Error updating room")
      }
    } catch (error) {
      console.error(error)
      setErrorMessage(error.message)
    }
    // setTimeout(() =>{
    //   setSuccseMessage("")
    //   setErrorMessage("")
    // }, 3000)
  }

  return (
    <>
        <section className="container, mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <h2 className="mt-5 mb-2">Edit room</h2>
                    
                    {
                        succseMessage &&(
                            <div className="alert alert-success fade show">
                                {succseMessage}
                            </div>
                        )
                    }
                    {
                        errorMessage &&(
                            <div className="alert alert-danger fade show">
                                {errorMessage}
                            </div>
                        )
                    }
                    <form action="" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor='roomType' className="form-label">
                                Room Type
                            </label>
                            <input 
                              type="text"
                              className="form-control"
                              id="roomType"
                              name="roomType"
                              value={room.roomType}
                              onChange={handleInputChange} 
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor='roomPrice' className="form-label">
                                Room Price
                            </label>
                            <input
                                className="form-control"
                                required
                                id="roomPrice"
                                name="roomPrice"
                                type="number"
                                value={room.roomPrice}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="photo" className="form-label">
                                Room Photo
                            </label>
                            <input 
                                id="photo"
                                name="photo"
                                type="file"
                                className="form-control"
                                onChange={handleImageChange} 
                            />
                            {imagePreview &&(
                                <img src={imagePreview} 
                                alt="Preview Room Photo"
                                style={{maxWidth: "400px", maxHeight: "400px"}}
                                className="mb-3"/>
                            )}
                        </div>

                        <div className="d-grid d-md-flex mt-2">
                            <Link to={"/existing-rooms"} className="btn btn-outline-info ml-5">
                              Back
                            </Link>
                            <button type="submit" className="btn btn-outline-warning">
                                Edit Room
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    
    </>
  )
}

export default EditRoom
