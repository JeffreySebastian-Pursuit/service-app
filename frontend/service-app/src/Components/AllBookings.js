import axios from 'axios';
import {apiURL} from '../Util/apiURL';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
const API = apiURL ();

function AllBookings () {
  const [bookings, setBookings] = useState ([]);
  useEffect (() => {
    const fetchAllBookings = async () => {
      let res = await axios.get (`${API}/bookings`);
      //   debugger
      setBookings (res.data);
      //   console.log(res.data)
    };
    fetchAllBookings ();
  }, []);
  return (
    <div>
      {bookings.map ((booking, index) => {
        const {name, floor, meeting_name, start_date, end_date, id} = booking;
        return (
          <Link exact to={`/bookings/${id}`}>
            <li key={index}>
              <h1>{meeting_name} </h1>
              <h3> {name}</h3>
              <h3>Start: {start_date}</h3>
              <h3>End: {end_date}</h3>
              <h3>Floor: {floor}</h3>
            </li>
          </Link>
        );
      })}
    </div>
  );
}

export default AllBookings;
