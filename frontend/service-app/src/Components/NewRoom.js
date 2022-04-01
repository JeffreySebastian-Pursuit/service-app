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

  const createRoom = async newRoom => {
    try {
      await axios.post (`${API}/meeting-rooms`, newRoom);
      history.push ('/meetingrooms');
      alert ('You just created a New Room available');
    } catch (error) {
      return error;
    }
  };

  const handleChange = e => {
    setNewRoom ({...newRoom, [e.target.id]: e.target.value});
  };

  const handleSubmit = e => {
    e.preventDefault ();
    createRoom (newRoom);
  };

  return (
    <div>
      <h2 class='mb-5 ml-5'>Create a Room</h2>
      <form onSubmit={handleSubmit} class="col-lg-5 offset-lg-4 ">
        <div class="column justify-content-center">
          <div class="row mb-3">
            <label htmlFor="name" class="col-sm-3 col-form-label">
              Meeting Name:{' '}
            </label>
            <div class="col-sm-5">
              <input
                class="form-control"
                value={newRoom.name}
                type="text"
                id="name"
                onChange={handleChange}
                placeholder="Enter room name"
                required
              />
            </div>
          </div>

          <div class="row mb-3">
            <label htmlFor="floor" class="col-sm-3 col-form-label">
              Floor:
            </label>

            <div class="col-sm-5">
              <input
                class="form-control"
                value={newRoom.floor}
                type="number"
                id="floor"
                onChange={handleChange}
                placeholder="Enter floor"
                min="0"
                required
              />
            </div>
          </div>
          <div class="row mb-3">
            <label htmlFor="capacity" class="col-sm-3 col-form-label">
              Capacity:
            </label>
            <div class="col-sm-5">
              <input
                class="form-control"
                value={newRoom.capacity}
                type="number"
                id="capacity"
                onChange={handleChange}
                placeholder="Enter capacity"
                min="0"
                required
              />
            </div>
          </div>
          <div class="col text-center">
            <button type="submit" class="mr-5 btn btn-success">Submit</button>
          </div>
        </div>
      </form>

    </div>
  );
}

export default NewRoom;
