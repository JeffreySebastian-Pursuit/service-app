DROP DATABASE IF EXISTS service_dev;
CREATE DATABASE service_dev;

\c service_dev;

DROP TABLE IF EXISTS meetingRoom CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;

CREATE TABLE meetingRoom(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    capacity INTEGER NOT NULL,
    floor INTEGER NOT NULL
);

CREATE TABLE bookings(
    id SERIAL PRIMARY KEY,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    meeting_name TEXT NOT NULL,
    attendees VARCHAR,
    meetingroom_id INTEGER REFERENCES meetingRoom (id) ON DELETE CASCADE
);

