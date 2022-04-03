import axios from 'axios';
import {apiURL} from '../Util/apiURL';
import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import moment from 'moment';

const API = apiURL ();
function BookingsDetails () {
  const [bookingDetails, setBookingDetails] = useState ({});
  const [loading, setLoading] = useState (true);
  const {id} = useParams ();
  let history = useHistory ();

  useEffect (
    () => {
      const fetchAllRooms = async () => {
        try {
          let res = await axios.get (`${API}/bookings/${id}`);
          res = res.data;
          const arrayToObject = res.reduce ((obj, item) => {
            obj = item;
            return obj;
          }, {});
          setBookingDetails (arrayToObject);
        } catch (error) {
          return error;
        }
      };
      fetchAllRooms ();
    },
    [id]
  );
  const deleteBooking = async id => {
    try {
      let res = await axios.delete (`${API}/bookings/${id}`);
      setBookingDetails (res.data);
    } catch (error) {
      console.log (error);
    }
  };
  const handleDelete = async () => {
    try {
      await deleteBooking (id);
      history.push ('/bookings');
    } catch (error) {
      console.lof (error);
    }
  };
  const {floor, meeting_name, start_date, end_date} = bookingDetails;
  console.log (bookingDetails);
  return (
    <div class="container mt-5">
      <div class="row aling-items-center">
        <di class="col-6 mx-auto">
          <div class="card shadow border border-4">
            <div class="ml-3 card-body d-flex flex-column align-items-left">
              <h1 class="mb-5">
                {meeting_name}
              </h1>
              <h3>
                🕘 &nbsp; Start:
                {' '}
                {moment (start_date).format ('MM/DD/YYYY, h:mm a')}
              </h3>
              <h3>
                🕘 &nbsp; End: {moment (end_date).format ('MM/DD/YYYY, h:mm a')}
              </h3>
              <h3>🏢 &nbsp; Floor: {floor}</h3>
            </div>
            <div class="col text-left mb-5 ml-4">
              <button onClick={handleDelete} class="btn btn-outline-secondary">
                Cancel
              </button>

            </div>
          </div>
        </di>
      </div>
    </div>
  );
}

export default BookingsDetails;
