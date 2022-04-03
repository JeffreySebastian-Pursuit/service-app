import axios from 'axios';
import {apiURL} from '../Util/apiURL';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import '../styles/NewRoom.scss'

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
    <form onSubmit={handleSubmit}>
      <div class="container d-flex justify-content-center">
        <div class="card px-1 py-4">
          <div class="card-body">
            <h6 class="card-title mb-3">Create a Room</h6>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  Room Name:
                  <input
                    class="form-control"
                    value={newRoom.name}
                    type="text"
                    id="name"
                    onChange={handleChange}
                    placeholder="Enter room name"
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
                    Floor:
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
                      value={newRoom.capacity}
                      type="number"
                      id="capacity"
                      onChange={handleChange}
                      placeholder="Enter capacity"
                      min="0"
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
              Submit
            </button>
          </div>
        </div>
      </div>

    </form>
  );
}

export default NewRoom;
