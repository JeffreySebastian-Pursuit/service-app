import axios from 'axios';
import {apiURL} from '../Util/apiURL';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import '../styles/AllBookings.scss'
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
          <div class="container mt-4">
            <div key={index} class="row aling-items-center">
              <div class="col-6 mx-auto">
                <div class="card shadow border border-4">
                  <div class="card-body d-flex flex-column align-items-center">
                    <Link exact to={`/bookings/${id}`} class="text-decoration-none">
                      <h1 class="card-title">{meeting_name} </h1>
                      <h3 class="card-subtitle mb-2 text-muted"> {name}</h3>
                      <h3 class="card-text"> 🕘 Start: {start_date}</h3>
                      <h3 class="card-text"> 🕘 End: {end_date}</h3>
                      <h3 class="card-text"> 🏢 Floor: {floor}</h3>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AllBookings;
