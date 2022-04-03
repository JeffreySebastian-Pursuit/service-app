import axios from 'axios';
import {apiURL} from '../Util/apiURL';
import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import moment from 'moment';
import '../styles/Bookings.scss';

const API = apiURL ();
function Bookings () {
  let history = useHistory ();
  const {id} = useParams ();
  const [bookRoom, setBookRoom] = useState ([]);
  const [room, setRoom] = useState ({});
  const [newBookRoom, setNewBookRoom] = useState ({
    meeting_name: '',
    start_date: new Date ().toLocaleDateString (),
    end_date: new Date ().toLocaleDateString (),
    attendees: '',
    meetingroom_id: id,
  });

  const createBooking = async newBook => {
    try {
      await axios.post (`${API}/bookings`, newBook);
      history.push (`/meetingrooms`);
      alert ('Booked Successfully');
    } catch (error) {
      alert ('Booking is not possible');
    }
  };

  useEffect (
    () => {
      const fetchBookRooms = async () => {
        try {
          let res = await axios.get (`${API}/meeting-rooms/${id}/bookings`);
          setBookRoom (res.data);
        } catch (error) {
          return error;
        }
      };
      const fetchRoom = async () => {
        try {
          let res = await axios.get (`${API}/meeting-rooms/${id}`);
          setRoom (res.data);
        } catch (error) {}
      };
      fetchRoom ();
      fetchBookRooms ();
    },
    [id]
  );
  const handleChange = e => {
    setNewBookRoom ({...newBookRoom, [e.target.id]: e.target.value});
  };

  const handleSubmit = e => {
    e.preventDefault ();
    createBooking (newBookRoom);
  };
  const {name, capacity, floor} = room;
  const {meeting_name, start_date, end_date, attendees} = newBookRoom;
  return (
    <div>
      <div>
        <div class="d-flex justify-content-center border-bottom">
          <h1 class="p-5 bd-highlight">{name}</h1>
          <h2 class="p-5 bd-highlight"> 👥 &nbsp; Capacity: {capacity}</h2>
          <h2 class="p-5 bd-highlight"> 🏢 &nbsp; Floor: {floor}</h2>
        </div>
      </div>
      <div class="container">
        <div class="left">
          <div class="header">
            <h2 class="animation a1">Book Room</h2>
          </div>
          <form class="form" onSubmit={handleSubmit}>
            Meeting Name:
            <input
              class="form-field animation a4"
              value={meeting_name}
              type="text"
              id="meeting_name"
              onChange={handleChange}
              placeholder="Enter meeting name"
              required
            />
            🕘 &nbsp; Start:
            <input
              class="form-field animation a4"
              value={start_date}
              type="datetime-local"
              id="start_date"
              onChange={handleChange}
              placeholder="Enter start date"
              required
            />
            🕘 &nbsp; End:
            <input
              class="form-field animation a4"
              value={end_date}
              type="datetime-local"
              id="end_date"
              onChange={handleChange}
              placeholder="Enter end date"
              required
            />
            👥 &nbsp; Attendees:
            <input
              class="form-field animation a4"
              value={attendees}
              type="text"
              id="attendees"
              onChange={handleChange}
              placeholder="Enter attendees"
            />
            <button class="animation a6" type="submit">Submit</button>
          </form>
        </div>
        <div class="right" />
      </div>
      <div>
        <div class="mt-5">
          {bookRoom.map ((room, index) => {
            return (
              <div
                key={index}
                class=" card container d-flex justify-content-center"
                id="cardwidth"
              >
                <div class="ml-5 mb-5 mt-5">
                  <h1>{room.meeting_name}</h1>
                  <h3>
                    {' '}
                    🕘 &nbsp; Start:&nbsp;
                    {moment (room.start_date).format ('MM/DD/YYYY, h:mm a')}
                  </h3>
                  <h3>
                    {' '}
                    🕘 &nbsp; End:&nbsp;
                    {moment (room.end_date).format ('MM/DD/YYYY, h:mm a')}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

export default Bookings;
