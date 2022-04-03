import {apiURL} from '../Util/apiURL';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import office from './rooms.webp';
import '../styles/MeetingRooms.scss';
const API = apiURL ();

function MeetingRooms () {
  const [rooms, setRooms] = useState ([]);


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


  return (
    <div>
      <div />
      <div id="meeting-rooms">
        {rooms.map ((room, index) => {
          return (
            <div class="card mx-auto d-flex justify-content-evenly">
              <div class="d-flex flex-row align-items-center">
                <Link
                  exact
                  to={`/meetingrooms/${room.id}`}
                  class="text-decoration-none"
                >
                  <div key={index} class="card-body">
                    <h1 class="card-title">{room.name}</h1>
                    <img src={office} alt="room" class="card-img-top" />

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
