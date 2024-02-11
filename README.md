# Bimbel-Ku
Aplikasi bimbel berbasis terminal yang sangat sederhana

# Tech-Stack
- Nodejs
- MongoDB
- Mongoose

# Models
- Guru
A database model for the course teacher. Containing name,id, and and array of courses he teaches.

- Murid
A database model for the student. Containing name, id, and an array of courses that he join

- Pelajaran
A model for the courses

# Controller
- Guru
The controller contain functions to add new teacher, delete teacher, adding a course to the teacher's array, etc

- Murid
The controller contain functions to add new student, delete student, adding a course to the students array, etc

- Pelajaran
 The controller contain functions to add and fetch courses

# Index
- When new user sign in => He need to make an account with name and id either as a teacher or student. If not, he will exit the application
- When registered teacher sign in => He can see list of courses he teaches and add courses he teach
- When registered student sign in => He can see list of courses he attend and add courses to join