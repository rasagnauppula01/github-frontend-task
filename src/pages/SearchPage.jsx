// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styles from './SearchPage.module.css';

// function SearchPage() {
//   const [username, setUsername] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (username.trim()) {
//       try {
//         const response = await fetch(
//           `https://backend-github-ihc5.onrender.com/api/users${e.target[0].value}`
//         );
//         if (response.ok) {
//           navigate(`/user/${username.trim()}`);
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Enter GitHub username"
//           className={styles.input}
//         />
//         <button type="submit" className={styles.button}>
//           Search
//         </button>
//       </form>
//     </div>
//   );
// }

// export default SearchPage;




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./SearchPage.module.css";

function SearchPage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.trim()) {
      try {
        const response = await fetch(
          `https://github-backend-task.onrender.com/api/users/${username.trim()}`
        );

        if (response.ok) {
          navigate(`/user/${username.trim()}`);
        } else if (response.status === 404) {
          toast.error("User not found in the database.", {
            position: "top-center",
            autoClose: 3000, // Auto close after 3 seconds
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          toast.error(
            "User Not Found In The Database.NOTE:The GitHub API works only on localhost and doesn't allow access from deployed projects.",
            {
              position: "top-center",
            }
          );
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to connect to the server.", {
          position: "top-center",
        });
      }
    } else {
      toast.warn("Please enter a GitHub username.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default SearchPage;
