import axios from 'axios';
import {apiURL} from '../Util/apiURL';
import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';

const API = apiURL ();
function Bookings () {
  let history = useHistory ();
  const {id} = useParams ();
  const [bookRoom, setBookRoom] = useState ([]);
  const [room, setRoom] = useState ({});
  const [newBookRoom, setNewBookRoom] = useState ({
    meeting_name: '',
    start_date: new Date (),
    end_date: new Date (),
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
        <h1>{name}</h1>
        <h3>Capity: {capacity}</h3>
        <h3>Floor: {floor}</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <p>Book room:</p>
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
          Start:
        </label>
        <input
          value={start_date}
          type="datetime-local"
          format-value="yyyy-MM-ddTHH:mm"
          id="start_date"
          onChange={handleChange}
          placeholder="Enter start date"
          required
        />
        <label htmlFor="end_date" className="text-secondary">
          End:
        </label>
        <input
          value={end_date}
          type="datetime-local"
          id="end_date"
          format-value="yyyy-MM-ddTHH:mm"
          onChange={handleChange}
          placeholder="Enter end date"
          required
        />
        <label htmlFor="attendees" className="text-secondary">
          Attendees:
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
                <h3>Start: {room.start_date}</h3>
                <h3>End: {room.end_date}</h3>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Bookings;
