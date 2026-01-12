// src/App.js
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// ----- Supabase client -----
const supabaseUrl = "https://sbjgoxiqpjgpgxwoykpv.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNiamdveGlxcGpncGd4d295a3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwNDExNzksImV4cCI6MjA3OTYxNzE3OX0.APTrE8HUl_YfYtvWevwZHJPCrxz1s9SEUFUZOxq0qxQ";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ----- React App -----
function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    Name: "",
    age: "",
    city: "",
  });

  // Fetch all rows from 'datainfo' table
  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    const { data, error } = await supabase.from("datainfo").select("*");
    if (error) {
      console.error("Error fetching students:", error);
      return;
    }
    setStudents(data);
  }

  // Delete a student
  async function deleteStudent(id) {
    const { error } = await supabase.from("datainfo").delete().eq("id", id);
    if (error) {
      console.error("Error deleting student:", error);
      return;
    }
    setStudents((prev) => prev.filter((student) => student.id !== id));
  }

  // Insert a new student
  async function insertStudent(e) {
    e.preventDefault();

    if (!formData.Name || !formData.age || !formData.city) {
      alert("Please fill all fields");
      return;
    }

    const { data, error } = await supabase.from("datainfo").insert([
      {
        Name: formData.Name,
        age: parseInt(formData.age),
        city: formData.city,
      },
    ]);

    if (error) {
      console.error("Insert error:", error);
    } else {
      setStudents((prev) => [...prev, ...data]);
      setFormData({ Name: "", age: "", city: "" }); // reset form
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>datainfo Table</h2>

      {/* Insert Form */}
      <form onSubmit={insertStudent} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Name"
          value={formData.Name}
          onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
          style={{ marginRight: "10px" }}
        />
        <input
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="City"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          style={{ marginRight: "10px" }}
        />
        <button type="submit">Add Student</button>
      </form>

      {/* Students Table */}
      <table
        border="1"
        cellPadding={10}
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="5">No data found</td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.Name}</td>
                <td>{student.age}</td>
                <td>{student.city}</td>
                <td>
                  <button
                    onClick={() => deleteStudent(student.id)}
                    style={{
                      color: "white",
                      backgroundColor: "red",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
