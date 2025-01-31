
// Import the react JS packages
import { useEffect, useState } from "react";
import axios from "axios";
// Define the Login function.
export const Home = () => {
  const [message, setMessage] = useState('');
  useEffect(() => {
    if (localStorage.getItem('access_token') === null) {
      window.location.href = '/login'
    }
    else {
      (async () => {
        try {
          const { data } = await axios.get(
            'http://localhost:8000/home/', {
            headers: {
              'Content-Type': 'application/json'
            }
          }
          );
          setMessage(data.message);
        } catch (e) {
          console.log('not auth')
        }
      })()
    };
  }, []);
  return (
    <div className="form-signin mt-5 text-center">
      <h3>Hi {message}</h3>
    </div>
  )

}








// import React from "react";

// export default function Home({ role }) {
//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>Welcome to Spot</h1>
//       <p style={styles.subtitle}>Your Smart Parking Solution</p>

//       {/* Admin-specific content */}
//       {role === "admin" && (
//         <div style={styles.section}>
//           <h2 style={styles.sectionTitle}>Admin Dashboard</h2>
//           <p>Full access to the system management and configurations.</p>
//         </div>
//       )}

//       {/* Staff-specific content */}
//       {role === "staff" && (
//         <div style={styles.section}>
//           <h2 style={styles.sectionTitle}>Staff Dashboard</h2>
//           <p>Manage parking places, view payments, and track parking activity.</p>
//         </div>
//       )}

//       {/* User-specific content */}
//       {role === "user" && (
//         <div style={styles.section}>
//           <h2 style={styles.sectionTitle}>User Dashboard</h2>
//           <p>View your parking history, payments, and available parking spots.</p>
//         </div>
//       )}
//     </div>
//   );
// }

// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     height: "100vh",
//     background: "linear-gradient(to right, #4facfe, #00f2fe)",
//     color: "white",
//   },
//   title: { fontSize: "3rem", fontWeight: "bold" },
//   subtitle: { fontSize: "1.5rem", marginTop: "10px" },
//   section: {
//     marginTop: "30px",
//     padding: "20px",
//     backgroundColor: "rgba(0, 0, 0, 0.6)",
//     borderRadius: "8px",
//     width: "80%",
//     textAlign: "center",
//   },
//   sectionTitle: {
//     fontSize: "2rem",
//     fontWeight: "bold",
//     marginBottom: "10px",
//   },
// };
