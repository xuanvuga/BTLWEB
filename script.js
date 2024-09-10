// script.js

// Dummy data for multiple semesters
const gradesData = {
  semester1: [
    {
      id: 1,
      subjectGroupCode: "MATH102",
      subjectCode: "FE100",
      fullName: "Math and Matrix",
      gpa: 3.8,
    },
    {
      id: 2,
      subjectGroupCode: "IT200",
      subjectCode: "BE-250",
      fullName: "Building Website",
      gpa: 3.5,
    },
    {
      id: 3,
      subjectGroupCode: "CS101",
      subjectCode: "ITEC-140",
      fullName: "Introduction to Computing",
      gpa: 4.0,
    },
  ],
  semester2: [
    {
      id: 4,
      subjectGroupCode: "ENG101",
      subjectCode: "ENG-101",
      fullName: "English Literature",
      gpa: 3.7,
    },
    {
      id: 5,
      subjectGroupCode: "PHY101",
      subjectCode: "PHY-201",
      fullName: "Physics I",
      gpa: 3.2,
    },
    {
      id: 6,
      subjectGroupCode: "CHEM101",
      subjectCode: "CHEM-101",
      fullName: "Chemistry Basics",
      gpa: 3.9,
    },
  ],
  semester3: [
    {
      id: 7,
      subjectGroupCode: "BIO101",
      subjectCode: "BIO-101",
      fullName: "Biology Introduction",
      gpa: 3.6,
    },
    {
      id: 8,
      subjectGroupCode: "MATH101",
      subjectCode: "MATH-101",
      fullName: "Calculus I",
      gpa: 3.4,
    },
    {
      id: 9,
      subjectGroupCode: "HIST101",
      subjectCode: "HIST-101",
      fullName: "World History",
      gpa: 3.8,
    },
  ],
};

// Extended dummy data for available courses
const availableCoursesData = [
  {
    id: 1,
    subjectGroupCode: "MATH102",
    subjectCode: "FE100",
    fullName: "Math and Matrix",
    schedule: "10am - 11:30am Monday",
  },
  {
    id: 2,
    subjectGroupCode: "IT200",
    subjectCode: "BE-250",
    fullName: "Building Website",
    schedule: "1pm - 2:30pm Wednesday",
  },
  {
    id: 3,
    subjectGroupCode: "CS101",
    subjectCode: "ITEC-140",
    fullName: "Introduction to Computing",
    schedule: "3pm - 4:30pm Thursday",
  },
  {
    id: 4,
    subjectGroupCode: "PHY101",
    subjectCode: "PHY-201",
    fullName: "Physics I",
    schedule: "11am - 12:30pm Monday",
  },
  {
    id: 5,
    subjectGroupCode: "ENG101",
    subjectCode: "ENG-101",
    fullName: "English Literature",
    schedule: "9am - 10:30am Tuesday",
  },
  {
    id: 6,
    subjectGroupCode: "BIO101",
    subjectCode: "BIO-101",
    fullName: "Biology Basics",
    schedule: "10am - 11:30am Monday",
  }, // Conflicts with Math and Matrix
  {
    id: 7,
    subjectGroupCode: "CHEM101",
    subjectCode: "CHEM-101",
    fullName: "General Chemistry",
    schedule: "1pm - 2:30pm Monday",
  },
  {
    id: 8,
    subjectGroupCode: "HIST101",
    subjectCode: "HIST-101",
    fullName: "World History",
    schedule: "11am - 12:30pm Tuesday",
  },
  {
    id: 9,
    subjectGroupCode: "MATH202",
    subjectCode: "MATH-201",
    fullName: "Advanced Calculus",
    schedule: "10am - 11:30am Thursday",
  },
  {
    id: 10,
    subjectGroupCode: "PHY202",
    subjectCode: "PHY-202",
    fullName: "Physics II",
    schedule: "11am - 12:30pm Thursday",
  }, // Conflicts with Advanced Calculus
  {
    id: 11,
    subjectGroupCode: "CS202",
    subjectCode: "ITEC-240",
    fullName: "Data Structures",
    schedule: "3pm - 4:30pm Wednesday",
  },
  {
    id: 12,
    subjectGroupCode: "ART101",
    subjectCode: "ART-101",
    fullName: "Introduction to Art",
    schedule: "1pm - 2:30pm Thursday",
  },
  {
    id: 13,
    subjectGroupCode: "MATH203",
    subjectCode: "MATH-203",
    fullName: "Linear Algebra",
    schedule: "10am - 11:30am Monday",
  }, // Conflicts with Math and Matrix
  {
    id: 14,
    subjectGroupCode: "ENG202",
    subjectCode: "ENG-201",
    fullName: "Creative Writing",
    schedule: "9am - 10:30am Friday",
  },
  {
    id: 15,
    subjectGroupCode: "BIO202",
    subjectCode: "BIO-201",
    fullName: "Microbiology",
    schedule: "2pm - 3:30pm Monday",
  },
  {
    id: 16,
    subjectGroupCode: "CHEM202",
    subjectCode: "CHEM-201",
    fullName: "Organic Chemistry",
    schedule: "1pm - 2:30pm Tuesday",
  },
  {
    id: 17,
    subjectGroupCode: "CS303",
    subjectCode: "ITEC-340",
    fullName: "Operating Systems",
    schedule: "3pm - 4:30pm Tuesday",
  },
  {
    id: 18,
    subjectGroupCode: "PHY303",
    subjectCode: "PHY-303",
    fullName: "Modern Physics",
    schedule: "11am - 12:30pm Wednesday",
  },
  {
    id: 19,
    subjectGroupCode: "MATH301",
    subjectCode: "MATH-301",
    fullName: "Differential Equations",
    schedule: "10am - 11:30am Wednesday",
  },
  {
    id: 20,
    subjectGroupCode: "CS301",
    subjectCode: "ITEC-320",
    fullName: "Algorithms",
    schedule: "3pm - 4:30pm Monday",
  },
];
let enrolledCourses = [];
// Helper function to convert 12-hour time format to 24-hour (military) time in minutes
function convertTo24Hour(timeStr) {
  const [time, period] = [timeStr.slice(0, -2), timeStr.slice(-2)];

  let [hours, minutes] = time.split(":");

  hours = parseInt(hours, 10);

  minutes = parseInt(minutes || "0", 10);

  if (period === "pm" && hours !== 12) hours += 12;
  if (period === "am" && hours === 12) hours = 0; // Midnight case
  return hours * 60 + minutes; // Convert hours and minutes into total minutes
}
function backToHomePage() {
  window.location.href = "index.html";
}
// Function to check for time and day conflicts
function hasConflict(newCourse) {
  return enrolledCourses.some((course) => {
    const newStart = convertTo24Hour(newCourse.schedule.split(" ")[0]);
    const newEnd = convertTo24Hour(newCourse.schedule.split(" ")[2]);
    const existingStart = convertTo24Hour(course.schedule.split(" ")[0]);
    const existingEnd = convertTo24Hour(course.schedule.split(" ")[2]);
    const newDay = newCourse.schedule.split(" ")[3]; // Get the day (e.g., Monday)
    const existingDay = course.schedule.split(" ")[3]; // Get the day for existing course
    // Check if the days match and if times conflict
    if (newDay === existingDay) {
      return (
        newStart < existingEnd && newEnd > existingStart // Overlap in time
      );
    }
    return false; // No conflict if the days don't match
  });
}

// Function to display enrolled courses
function displayEnrolledCourses() {
  const enrolledList = document.getElementById("enrolledCourses");
  enrolledList.innerHTML = "";
  enrolledCourses.forEach((course) => {
    const li = document.createElement("li");
    li.textContent = `${course.subjectGroupCode} (${course.subjectCode}) - ${course.fullName} [${course.schedule}]`;
    enrolledList.appendChild(li);
  });
}
// Function to display available courses
function displayAvailableCourses() {
  const availableList = document.getElementById("availableCourses");
  availableList.innerHTML = "";
  availableCoursesData.forEach((course) => {
    if (!enrolledCourses.includes(course)) {
      const li = document.createElement("li");
      li.textContent = `${course.subjectGroupCode} (${course.subjectCode}) - ${course.fullName} [${course.schedule}]`;
      const enrollButton = document.createElement("button");
      enrollButton.textContent = "Enroll";
      enrollButton.onclick = () => enrollCourse(course);
      li.appendChild(enrollButton);
      availableList.appendChild(li);
    }
  });
}

const adminAccount = {
  username: "admin",
  password: "111",
};

// Function to check if user is logged in
function checkLogin() {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    alert("Please log in first.");
    window.location.href = "login.html";
  }
}

// Function to save users to localStorage
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Function to get users from localStorage
function getUsers() {
  const listUser = JSON.parse(localStorage.getItem("users"));
  console.log(listUser);
  return JSON.parse(localStorage.getItem("users")) || [];
}
console.log("getUser", getUsers());
// Function to save current user
function saveCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

// Function to get current user
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}
// Function to sign out the user
function signOut() {
  localStorage.removeItem("currentUser");
  alert("You have been signed out.");
  window.location.href = "login.html";
}
// Function to handle registration
function registerUser(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const users = getUsers();
  users.push(adminAccount);
  if (users.some((user) => user.username === username)) {
    alert("Username already exists.");
    return;
  }

  users.push({ username, password });
  saveUsers(users);
  alert("Registration successful!");
  window.location.href = "login.html";
}

// Function to handle login
function loginUser(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const users = getUsers();
  users.push(adminAccount);
  console.log("users", users);
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    saveCurrentUser(user);
    alert("Login successful!");
    window.location.href = "index.html";
  } else {
    alert("Invalid username or password.");
  }
}

// Function to display grades based on selected semester
function displayGrades() {
  const semester = document.getElementById("semester").value;
  const gradesTable = document.getElementById("gradesTable");
  gradesTable.innerHTML = ""; // Clear existing rows

  const grades = gradesData[semester];
  grades.forEach((grade) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${grade.id}</td>
          <td>${grade.subjectGroupCode}</td>
          <td>${grade.subjectCode}</td>
          <td>${grade.fullName}</td>
          <td>${grade.gpa}</td>
      `;
    gradesTable.appendChild(row);
  });
}
// Function to enroll in a course
function enrollCourse(course) {
  if (hasConflict(course)) {
    alert("Cannot enroll in this course due to a scheduling conflict.");
    return;
  }

  enrolledCourses.push(course);
  displayEnrolledCourses();
  displayAvailableCourses();
}

// Event listeners for forms
if (document.getElementById("registerForm")) {
  document
    .getElementById("registerForm")
    .addEventListener("submit", registerUser);
}

if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").addEventListener("submit", loginUser);
}

if (document.getElementById("enrollmentForm")) {
  document
    .getElementById("enrollmentForm")
    .addEventListener("submit", enrollCourse);
}

function handleCheckAccessPage() {}

// Ensure the user is logged in when accessing protected pages
if (window.location.pathname.endsWith("grades.html")) {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    console.log("You must be logged in");
    alert("Please log in first.");
    window.location.href = "login.html";
  } else {
    displayGrades();
  }
} else if (
  window.location.pathname.endsWith("enrollment.html") ||
  window.location.pathname.endsWith("index.html")
) {
  checkLogin(); // Additional check to ensure the user is logged in
}
// Initial display of courses
window.onload = () => {
  displayEnrolledCourses();
  displayAvailableCourses();
};
