import React from 'react';
import room from '../Components/rooms.webp';
import '../styles/Home.scss'
function Home () {
  return (
    <div class="mt-5">
      <div class="cardcontainer">
        <div class="photo">
          {' '}<img src={room} alt="room" />
          <div class="photos" />

          <div class="content" />
        </div>
        <h1 class='mt-5'>
          Welcome To Service App
        </h1>

      </div>
    </div>
  );
}

export default Home;
