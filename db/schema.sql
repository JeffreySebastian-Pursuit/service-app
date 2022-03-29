DROP DATABASE IF EXISTS service_dev;
CREATE DATABASE service_dev;

\c service_dev;

CREATE TABLE meetingRoom(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    capacity NUMERIC NOT NULL,
    floor INTEGER NOT NULL
);

CREATE TABLE booking(
    id SERIAL PRIMARY KEY,
    startDate TEXT NOT NULL,
    endDate TEXT NOT NULL,
    meetingName TEXT NOT NULL,
    attendees VARCHAR,
    meetingRoomId INTEGER REFERENCES meetingRoom (id) ON DELETE CASCADE
);

