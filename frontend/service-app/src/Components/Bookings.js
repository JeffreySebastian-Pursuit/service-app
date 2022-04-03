import axios from 'axios';
import {apiURL} from '../Util/apiURL';
import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import moment from 'moment'
import '../styles/Bookings.scss';

const API = apiURL ();
function Bookings () {
  let history = useHistory ();
  const {id} = useParams ();
  const [bookRoom, setBookRoom] = useState ([]);
  const [room, setRoom] = useState ({});
  const [newBookRoom, setNewBookRoom] = useState ({
    meeting_name: '',
    start_date: new Date().toLocaleDateString(),
    end_date: new Date().toLocaleDateString(),
    attendees: '',
    meetingroom_id: id,
  });

  const createBooking = async newBook => {
    try {
      await axios.post (`${API}/bookings`, newBook);
      history.push (`/meetingrooms`);
      alert ('Booked Successfully');
    } catch (error) {
      // console.log(error)
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
    // debugger
    setNewBookRoom ({...newBookRoom, [e.target.id]: e.target.value});
    // debugger
  };

  const handleSubmit = e => {
    e.preventDefault ();
    createBooking (newBookRoom);
  };

  const {name, capacity, floor} = room;
  const {meeting_name, start_date, end_date, attendees} = newBookRoom;
  return (
    <div>

      <div class="border-bottom">
        <div class="d-flex">
          <h1 class="p-5 bd-highlight">{name}</h1>
          <h3 class="p-5 bd-highlight"> 👥 &nbsp; Capity: {capacity}</h3>
          <h3 class="p-5 bd-highlight"> 🏢 &nbsp; Floor: {floor}</h3>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Book room:</h3>
        <label htmlFor="meeting_name" className="text-secondary">
          Meeting Name:
        </label>
        <input
          value={meeting_name}
          type="text"
          id="meeting_name"
          onChange={handleChange}
          placeholder="Enter meeting name"
          required
        />
        <label htmlFor="start_date" className="text-secondary">
          🕘 &nbsp; Start:
        </label>
        <input
          value={start_date}
          type="datetime-local"
          id="start_date"
          onChange={handleChange}
          placeholder="Enter start date"
          required
        />
        <label htmlFor="end_date" className="text-secondary">
          🕘 &nbsp; End:
        </label>
        <input
          value={end_date}
          type="datetime-local"
          id="end_date"
          onChange={handleChange}
          placeholder="Enter end date"
          required
        />
        <label htmlFor="attendees" className="text-secondary">
          👥 &nbsp; Attendees:
        </label>
        <input
          value={attendees}
          type="text"
          id="attendees"
          onChange={handleChange}
          placeholder="Enter attendees"
        />
        <button type="submit">Submit</button>
      </form>

      <div>
        <ul>
          {bookRoom.map ((room, index) => {
            return (
              <li key={index}>
                <h1>{room.meeting_name}</h1>
                <h3> 🕘 &nbsp; Start:&nbsp;{moment(room.start_date).format('MM/DD/YYYY, h:mm a')}</h3>
                <h3> 🕘 &nbsp; End:&nbsp;{moment(room.end_date).format('MM/DD/YYYY, h:mm a')}</h3>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Bookings;
