import "./App.css"; 
import { useEffect, useState } from "react";

const API_BASE = "https://course-management-backend-production.up.railway.app/api";

function App() {
  const [tab, setTab] = useState("courses");

  // === Courses ===
  const [courses, setCourses] = useState([]);
  const [courseForm, setCourseForm] = useState({ code: "", title: "" });
  const [editingCourse, setEditingCourse] = useState(null);

  // === Students ===
  const [students, setStudents] = useState([]);
  const [studentForm, setStudentForm] = useState({ regNo: "", name: "", email: "" });
  const [editingStudent, setEditingStudent] = useState(null);

  // === Registrations ===
  const [registrations, setRegistrations] = useState([]);
  const [registrationForm, setRegistrationForm] = useState({ studentId: "", courseId: "", semester: "" });
  const [editingRegistration, setEditingRegistration] = useState(null);

  // === Results ===
  const [results, setResults] = useState([]);
  const [resultForm, setResultForm] = useState({ registrationId: "", grade: "" });
  const [editingResult, setEditingResult] = useState(null);

  // Fetch based on active tab
  useEffect(() => {
    if (tab === "courses") {
      fetch(`${API_BASE}/courses`).then(res => res.json()).then(setCourses);
    }
    if (tab === "students") {
      fetch(`${API_BASE}/students`).then(res => res.json()).then(setStudents);
    }
    if (tab === "registrations") {
      fetch(`${API_BASE}/registrations`).then(res => res.json()).then(setRegistrations);
    }
    if (tab === "results") {
      fetch(`${API_BASE}/results`).then(res => res.json()).then(setResults);
    }
  }, [tab]);

  // === Handlers ===
  // Submit Course
  const submitCourse = async (e) => {
    e.preventDefault();
    if (editingCourse) {
      const res = await fetch(`${API_BASE}/courses/${editingCourse.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseForm)
      });
      const updated = await res.json();
      setCourses(courses.map(c => c.id === updated.id ? updated : c));
      setEditingCourse(null);
    } else {
      const res = await fetch(`${API_BASE}/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseForm)
      });
      const saved = await res.json();
      setCourses([...courses, saved]);
    }
    setCourseForm({ code: "", title: "" });
  };

  const handleDeleteCourse = async (id) => {
    await fetch(`${API_BASE}/courses/${id}`, { method: "DELETE" });
    setCourses(courses.filter(c => c.id !== id));
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setCourseForm({ code: course.code, title: course.title });
  };

  // === Students ===
  const submitStudent = async (e) => {
    e.preventDefault();
    if (editingStudent) {
      const res = await fetch(`${API_BASE}/students/${editingStudent.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentForm)
      });
      const updated = await res.json();
      setStudents(students.map(s => s.id === updated.id ? updated : s));
      setEditingStudent(null);
    } else {
      const res = await fetch(`${API_BASE}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentForm)
      });
      const saved = await res.json();
      setStudents([...students, saved]);
    }
    setStudentForm({ regNo: "", name: "", email: "" });
  };

  const handleDeleteStudent = async (id) => {
    await fetch(`${API_BASE}/students/${id}`, { method: "DELETE" });
    setStudents(students.filter(s => s.id !== id));
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setStudentForm({ regNo: student.regNo, name: student.name, email: student.email });
  };

  // === Registrations ===
  const submitRegistration = async (e) => {
    e.preventDefault();
    if (editingRegistration) {
      const res = await fetch(`${API_BASE}/registrations/${editingRegistration.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationForm)
      });
      const updated = await res.json();
      setRegistrations(registrations.map(r => r.id === updated.id ? updated : r));
      setEditingRegistration(null);
    } else {
      const res = await fetch(`${API_BASE}/registrations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationForm)
      });
      const saved = await res.json();
      setRegistrations([...registrations, saved]);
    }
    setRegistrationForm({ studentId: "", courseId: "", semester: "" });
  };

  const handleDeleteRegistration = async (id) => {
    await fetch(`${API_BASE}/registrations/${id}`, { method: "DELETE" });
    setRegistrations(registrations.filter(r => r.id !== id));
  };

  const handleEditRegistration = (registration) => {
    setEditingRegistration(registration);
    setRegistrationForm({ studentId: registration.studentId, courseId: registration.courseId, semester: registration.semester });
  };

  // === Results ===
  const submitResult = async (e) => {
    e.preventDefault();
    if (editingResult) {
      const res = await fetch(`${API_BASE}/results/${editingResult.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resultForm)
      });
      const updated = await res.json();
      setResults(results.map(r => r.id === updated.id ? updated : r));
      setEditingResult(null);
    } else {
      const res = await fetch(`${API_BASE}/results`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resultForm)
      });
      const saved = await res.json();
      setResults([...results, saved]);
    }
    setResultForm({ registrationId: "", grade: "" });
  };

  const handleDeleteResult = async (id) => {
    await fetch(`${API_BASE}/results/${id}`, { method: "DELETE" });
    setResults(results.filter(r => r.id !== id));
  };

  const handleEditResult = (result) => {
    setEditingResult(result);
    setResultForm({ registrationId: result.registrationId, grade: result.grade });
  };

  return (
    <div className="container">
      <h1 className="title">University Course Management System</h1>

      {/* Tabs */}
      <div className="tabs">
        <button className={tab === "courses" ? "active" : ""} onClick={() => setTab("courses")}>Courses</button>
        <button className={tab === "students" ? "active" : ""} onClick={() => setTab("students")}>Students</button>
        <button className={tab === "registrations" ? "active" : ""} onClick={() => setTab("registrations")}>Registrations</button>
        <button className={tab === "results" ? "active" : ""} onClick={() => setTab("results")}>Results</button>
      </div>

      {/* === COURSES === */}
      {tab === "courses" && (
        <div>
          <h2>Courses</h2>
          <form onSubmit={submitCourse} className="form">
            <input placeholder="Code" value={courseForm.code} onChange={e => setCourseForm({ ...courseForm, code: e.target.value })} required />
            <input placeholder="Title" value={courseForm.title} onChange={e => setCourseForm({ ...courseForm, title: e.target.value })} required />
            <button className="btn-primary">{editingCourse ? "Update Course" : "Add Course"}</button>
          </form>
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(c => (
                <tr key={c.id}>
                  <td>{c.code}</td>
                  <td>{c.title}</td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEditCourse(c)}>Edit</button>
                    <button className="btn-delete" onClick={() => handleDeleteCourse(c.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* === STUDENTS === */}
      {tab === "students" && (
        <div>
          <h2>Students</h2>
          <form onSubmit={submitStudent} className="form">
            <input placeholder="Reg No" value={studentForm.regNo} onChange={e => setStudentForm({ ...studentForm, regNo: e.target.value })} required />
            <input placeholder="Name" value={studentForm.name} onChange={e => setStudentForm({ ...studentForm, name: e.target.value })} required />
            <input placeholder="Email" type="email" value={studentForm.email} onChange={e => setStudentForm({ ...studentForm, email: e.target.value })} required />
            <button className="btn-primary">{editingStudent ? "Update Student" : "Add Student"}</button>
          </form>
          <table>
            <thead>
              <tr>
                <th>Reg No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={s.id}>
                  <td>{s.regNo}</td>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEditStudent(s)}>Edit</button>
                    <button className="btn-delete" onClick={() => handleDeleteStudent(s.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* === REGISTRATIONS === */}
      {tab === "registrations" && (
        <div>
          <h2>Registrations</h2>
          <form onSubmit={submitRegistration} className="form">
            <select value={registrationForm.studentId} onChange={e => setRegistrationForm({ ...registrationForm, studentId: e.target.value })} required>
              <option value="">Select Student</option>
              {students.map(s => (
                <option key={s.id} value={s.id}>{s.regNo} - {s.name}</option>
              ))}
            </select>
            <select value={registrationForm.courseId} onChange={e => setRegistrationForm({ ...registrationForm, courseId: e.target.value })} required>
              <option value="">Select Course</option>
              {courses.map(c => (
                <option key={c.id} value={c.id}>{c.code} - {c.title}</option>
              ))}
            </select>
            <input placeholder="Semester (e.g. 2025A)" value={registrationForm.semester} onChange={e => setRegistrationForm({ ...registrationForm, semester: e.target.value })} required />
            <button className="btn-primary">{editingRegistration ? "Update Registration" : "Register"}</button>
          </form>
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Course ID</th>
                <th>Semester</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map(r => (
                <tr key={r.id}>
                  <td>{r.studentId}</td>
                  <td>{r.courseId}</td>
                  <td>{r.semester}</td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEditRegistration(r)}>Edit</button>
                    <button className="btn-delete" onClick={() => handleDeleteRegistration(r.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* === RESULTS === */}
      {tab === "results" && (
        <div>
          <h2>Results</h2>
          <form onSubmit={submitResult} className="form">
            <select value={resultForm.registrationId} onChange={e => setResultForm({ ...resultForm, registrationId: e.target.value })} required>
              <option value="">Select Registration</option>
              {registrations.map(r => (
                <option key={r.id} value={r.id}>Student {r.studentId} - Course {r.courseId} ({r.semester})</option>
              ))}
            </select>
            <input placeholder="Grade (e.g. A, B+)" value={resultForm.grade} onChange={e => setResultForm({ ...resultForm, grade: e.target.value })} required />
            <button className="btn-primary">{editingResult ? "Update Result" : "Add Result"}</button>
          </form>
          <table>
            <thead>
              <tr>
                <th>Registration ID</th>
                <th>Grade</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {results.map(r => (
                <tr key={r.id}>
                  <td>{r.registrationId}</td>
                  <td>{r.grade}</td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEditResult(r)}>Edit</button>
                    <button className="btn-delete" onClick={() => handleDeleteResult(r.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
