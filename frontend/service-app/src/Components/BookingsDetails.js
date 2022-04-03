import axios from 'axios';
import {apiURL} from '../Util/apiURL';
import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import room from './rooms.webp';
import moment from 'moment';
import '../styles/BookingDetails.scss'

const API = apiURL ();
function BookingsDetails () {
  const [bookingDetails, setBookingDetails] = useState ({});
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
      // eslint-disable-next-line no-restricted-globals
      confirm("Are you sure do you want to cancel your booking?")
    } catch (error) {
      console.lof (error);
    }
  };
  const {floor, meeting_name, start_date, end_date} = bookingDetails;
  const upperCaseFirstLetter = name => {
    return name?.charAt (0).toUpperCase () + name?.substring (1).toLowerCase ();
  };
  console.log (bookingDetails);
  return (
    <div class="mt-5">
      <h1>{upperCaseFirstLetter(meeting_name)}</h1>
      <div class="cardcontainer">
        <div class="photo">
          {' '}<img src={room} alt="room" />
          <div class="photos" />
        </div>
        <div class="content">
          <p class="txt4">
            🕘 &nbsp; Start:
            {moment (start_date).format ('MM/DD/YYYY, h:mm a')}
          </p>
          <p class="txt5">
            {' '}
            🕘 &nbsp; End:
            {' '}
            {moment (end_date).format ('MM/DD/YYYY, h:mm a')}
          </p>
          <p class="txt2">
            🏢 &nbsp; Floor: {floor}
          </p>
          <div>
              <button onClick={handleDelete} class="btn btn-outline-secondary">
                Cancel
              </button>
            </div>
        </div>

      </div>
    </div>
  );
}


export default BookingsDetails;
