import axios from 'axios';
import {apiURL} from '../Util/apiURL';
import {useEffect, useState} from 'react';
import room from './rooms.webp';
import {Link} from 'react-router-dom';
import '../styles/AllBookings.scss';
import moment from 'moment';
const API = apiURL ();

function AllBookings () {
  const [bookings, setBookings] = useState ([]);
  useEffect (() => {
    const fetchAllBookings = async () => {
      let res = await axios.get (`${API}/bookings`);
      setBookings (res.data);
    };
    fetchAllBookings ();
  }, []);
  const upperCaseFirstLetter = name => {
    return name.charAt (0).toUpperCase () + name.substring (1).toLowerCase ();
  };

  return (
    <div id='container'>
      {bookings.map ((booking, index) => {
        const {name, floor, meeting_name, start_date, end_date, id} = booking;
        return (
          <div class="mt-5 ">
            <div class="card mx-auto d-flex justify-content-evenly">
              <div class="d-flex flex-row align-items-center">
                <Link
                  exact
                  to={`/bookings/${id}`}
                  class="text-decoration-none "
                >
                  <img src={room} alt="room" class="card-img-top" />
                  <div class="card-body">
                    <h2 class="card-title">{name}</h2>
                    <h5>{upperCaseFirstLetter (meeting_name)}</h5>
                    <p class="h4">
                      {' '}
                      🕘 &nbsp;Start:
                      {' '}
                      {moment (start_date).format ('MM/DD/YYYY, h:mm a')}
                    </p>
                    <p class='h4'>
                      🕘 &nbsp;End:
                      {' '}
                      {moment (end_date).format ('MM/DD/YYYY, h:mm a')}
                    </p>
                    <p class='h4'>🏢 &nbsp;Floor: Floor: {floor}</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AllBookings;
