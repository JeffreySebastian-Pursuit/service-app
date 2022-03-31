import axios from 'axios';
import {apiURL} from '../Util/apiURL';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';

const API = apiURL ();

function NewRoom () {
  const [newRoom, setNewRoom] = useState ({
    name: '',
    capcity: 0,
    floor: 0,
  });
  let history = useHistory ();

  const createRoom = async (newRoom) => {
    try {
      await axios.post(`${API}/meeting-rooms`, newRoom);
      history.push ('/meetingrooms');
      alert('You just created a New Room available')
    } catch (error) {
      return error;
    }
  };

  const handleChange = (e)=> {
    setNewRoom ({ ...newRoom, [e.target.id]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault ();
    createRoom (newRoom);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Create a Room</h2>
        <label htmlFor="name" className="text-secondary">
          Meeting Name:
        </label>
        <input
          value={newRoom.name}
          type="text"
          id="name"
          onChange={handleChange}
          placeholder="Enter room name"
          required
        />
        <label htmlFor="floor" className="text-secondary">
          Floor:
        </label>
        <input
          value={newRoom.floor}
          type="number"
          id="floor"
          onChange={handleChange}
          placeholder="Enter floor"
          required
        />
        <label htmlFor="capacity" className="text-secondary">
          Capacity:
        </label>
        <input
          value={newRoom.capacity}
          type="number"
          id="capacity"
          onChange={handleChange}
          placeholder="Enter floor"
          required
        />
        <button type="submit">Submit</button>
      </form>

    </div>
  );
}

export default NewRoom;
