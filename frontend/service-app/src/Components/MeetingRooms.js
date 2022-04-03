import {apiURL} from '../Util/apiURL';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import office from './rooms.webp';
import '../styles/MeetingRooms.scss'
const API = apiURL ();

function MeetingRooms () {
  const [rooms, setRooms] = useState ([]);
  // var today = new Date (),
  //   date =
  //     today.getMonth () + 1 + '/' + today.getDate () + today.getFullYear ();
  const [newBooking, setNewBooking] = useState ({
    start: new Date (),
    end_date: new Date (),
    floor: 0,
    capacity: 0,
    roomId: 0,
  });
  const [availableRooms, setAvailableRooms] = useState ({
    start: new Date (),
    end_date: new Date (),
    floor: 0,
    capacity: 0,
  });
  useEffect (() => {
    const fetchAllRooms = async () => {
      try {
        let res = await axios.get (`${API}/meeting-rooms`);
        setRooms (res.data);
      } catch (error) {
        return error;
      }
    };
    fetchAllRooms ();
  }, []);

  useEffect (() => {
    const fetchAvailableRooms = async () => {
      try {
        let res = await axios.get (`${API}/meeting-rooms/available`);
        setAvailableRooms (res.data);
      } catch (error) {}
    };
    fetchAvailableRooms ();
  }, []);

  // const handleChange = e => {
    // debugger;
    // setAvailableRooms ({...availableRooms, [e.target.id]: e.target.value});
    // setNewBooking ({...newBooking, [e.target.id]: e.target.value});
    // debugger;
  // };
  // const findRooms = e => {
  //   e.preventDefault ();
  //   availableRooms.map ((room, index) => {
  //     const {start, end_date, capacity, floor} = room;
  //     if (newBooking.start !== start && newBooking.end_date !== end_date) {
  //       // setAvailableRooms(newBooking)
  //       debugger;
  //       setNewBooking ({...newBooking, [newBooking.roomId]: rooms.id});
  //       debugger;
  //     }
  //   });
  // };

  // const {start, end_date, floor, capacity} = newBooking;

  return (
    <div>
      <div>
        {/* <form>
          <div class="container d-flex justify-content-center">
            <div class="card px-1 py-4">
              <div class="card-body">
                <h6 class="card-title mb-3">Find available room</h6>
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group">
                    Start Date: 
                      <input
                        class="form-control"
                        value={start}
                        type="datetime-local"
                        id="start"
                        onChange={handleChange}
                        placeholder="Enter start date"
                        min={start}
                        required
                      />
                      {' '}
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group">
                      <div class="input-group">
                        End Date:
                        <input
                          class="form-control"
                          value={end_date}
                          type="datetime-local"
                          id="end_date"
                          onChange={handleChange}
                          placeholder="Enter end date"
                          min={end_date}
                          required
                        />
                        {' '}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group">
                      <div class="input-group">
                       Floor:
                        <input
                          class="form-control"
                          value={floor}
                          type="number"
                          id="floor"
                          onChange={handleChange}
                          placeholder="Enter floor"
                          required
                        />
                        {' '}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group">
                      <div class="input-group">
                        Capacity:
                        <input
                          class="form-control"
                          value={capacity}
                          type="number"
                          id="capacity"
                          onChange={handleChange}
                          placeholder="Enter capacity"
                          required
                        />
                        {' '}
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  class="btn btn-primary btn-block confirm-button"
                  type="submit"
                >
                  Find
                </button>
              </div>
            </div>
          </div>
        </form> */}
      </div>
      <div class='meeting-rooms'>
        {rooms.map((room, index) => {
          return (
            <div class='card mx-auto d-flex justify-content-evenly'> 
            <div class="d-flex flex-row align-items-center">
            <Link exact to={`/meetingrooms/${room.id}`} class='text-decoration-none'>
              <div key={index} class="card-body">
                <h1 class="card-title">{room.name}</h1>
              <img src={office} alt='room' class="card-img-top"/>
              
                <p class="h4">Capacity: {room.capacity}</p>
                <p class="h4">Floor: {room.floor}</p>
              </div>
            </Link>
            </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MeetingRooms;
