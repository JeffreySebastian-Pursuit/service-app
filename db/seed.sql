\c service_dev;

INSERT INTO meetingRoom(name, capacity, floor) VALUES
('Meeting Room 1', 3, 22),
('Meeting Room 2', 6, 12),
('Meeting Room 3', 12, 23),
('Meeting Room 4', 9, 14);


INSERT INTO bookings(start_date, end_date, meeting_name, attendees, meetingroom_id)VALUES
('3/27/2022 11:30', '3/27/2021 12:30','Scrum Standup','jdoe@email.com, bdylan@email.com', 1),
('4/1/2022 10:30', '4/1/2021 12:30','Scrum Standup','bdylan@email.com, bdylan@email.com', 2),
('3/28/2022 11:30', '3/28/2021 12:30','Scrum Standup','bdylan@email.com, bdylan@email.com', 1),
('3/29/2022 11:30', '3/29/2021 12:30','Scrum Standup','jdoe@email.com', 3);