import { apiURL } from "../Util/apiURL";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const API = apiURL();

function MeetingRooms() {
  const [rooms, setRooms] = useState([]);
  var today = new Date(),

  date =(today.getMonth() + 1) + '/' + today.getDate() + today.getFullYear();
  const [availableRooms, setAvailableRooms] = useState({
    start: date,
    end_date: date,
    floor: 0,
    capacity: 0,
  });
  useEffect(() => {
    const fetchAllRooms = async () => {
      try {
        let res = await axios.get(`${API}/meeting-rooms`);
        setRooms(res.data);
      } catch (error) {
        return error
      }
    };
    fetchAllRooms();
  }, []);

  useEffect(() => {
    const fetchAvailableRooms = async () => {
      try {
        let res = await axios.get(`${API}/meeting-rooms/available`);
        setAvailableRooms(res.data);
      } catch (error) {}
    };
    fetchAvailableRooms();
  }, []);

  const { start, end_date, floor, capacity } = availableRooms;

  return (
    <div>
      <div>
        <form>
          <p>Find available rooms:</p>
          <label htmlFor="start" className="text-secondary">
            Start:
          </label>
          <input
            value={start}
            type="date"
            id="start"
            //   onChange={handleChange}
            placeholder="Enter start date"
            required
          />
          <label htmlFor="end_date" className="text-secondary">
            End:
          </label>
          <input
            value={end_date}
            type="date"
            id="end_date"
            //   onChange={handleChange}
            placeholder="Enter end date"
            required
          />
          <label htmlFor="floor" className="text-secondary">
            Floor:
          </label>
          <input
            value={floor}
            type="number"
            id="floor"
            //   onChange={handleChange}
            placeholder="Enter floor"
            required
          />
          <label htmlFor="capacity" className="text-secondary">
            Capacity:
          </label>
          <input
            value={capacity}
            type="number"
            id="capacity"
            //   onChange={handleChange}
            placeholder="Enter capacity"
            required
          />
          <button type="submit">Find</button>
        </form>
      </div>
      <ul>
        {rooms.map((room, index) => {
          return (
            <Link  exact to={`/meetingrooms/${room.id}`}>
              <li key={index}>
                <h1>{room.name}</h1>
                <p>Capacity: {room.capacity}</p>
                <p>Floor: {room.floor}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default MeetingRooms;
