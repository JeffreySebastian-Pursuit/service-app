import axios from 'axios';
import {apiURL} from '../Util/apiURL';
import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';

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
    <div>
      <div>
        <h1>
          {meeting_name}
        </h1>
        <h3>Start: {start_date}</h3>
        <h3>End: {end_date}</h3>
        <h3>Floor: {floor}</h3>
        <button onClick={handleDelete}>Cancel</button>
      </div>
    </div>
  );
}

export default BookingsDetails;
