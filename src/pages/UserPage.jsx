import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getUser, getUserRepos, deleteUser } from "../services/api"; // Assuming deleteUser is an API function
import { FaUserFriends, FaUsers, FaStar, FaCodeBranch } from "react-icons/fa"; // Icons for followers, following, star, and fork
import styles from "./UserPage.module.css";

function UserPage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, reposData] = await Promise.all([
          getUser(username),
          getUserRepos(username),
        ]);
        setUser(userData);
        setRepos(reposData);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user profile?"
    );
    if (!confirmDelete) return;

    try {
      await deleteUser(username); // Assuming the API call for deleting user
      alert("User profile deleted successfully!");
      navigate("/"); // Redirect to home page or any other page after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user profile.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => navigate("/")} className={styles.backButton}>
          Back to Search
        </button>
        <button onClick={handleDelete} className={styles.deleteButton}>
          🗑️ Delete Profile
        </button>
      </div>

      <div className={styles.userInfo}>
        <img src={user.avatar_url} alt={user.login} className={styles.avatar} />
        <div className={styles.userDetails}>
          <h1>{user.name || user.login}</h1>
          <p>{user.bio}</p>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <FaUserFriends className={styles.iconGreen} />
              <span>Followers: {user.followers}</span>
            </div>
            <div className={styles.statItem}>
              <FaUsers className={styles.iconBlue} />
              <span>Following: {user.following}</span>
            </div>
            <div className={styles.statItem}>
              <span>Repositories: {user.public_repos}</span>
            </div>
          </div>
          {user.location && (
            <div className={styles.location}>
              <span>📍 Location: {user.location}</span>
            </div>
          )}
          <Link
            to={`/user/${username}/followers`}
            className={styles.viewFollowersButton}
          >
            View Followers
          </Link>
        </div>
      </div>

      <div className={styles.repoList}>
        <h2>Repositories</h2>
        {repos.length === 0 ? (
          <p>No repositories found.</p>
        ) : (
          repos.map((repo) => (
            <div key={repo.id} className={styles.repoItem}>
              <Link
                to={`/user/${username}/repo/${repo.name}`}
                className={styles.repoLink}
              >
                <h3>{repo.name}</h3>
                <p>{repo.description}</p>
                <div className={styles.repoStats}>
                  <div className={styles.repoStatItem}>
                    <FaStar className={styles.iconYellow} />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className={styles.repoStatItem}>
                    <FaCodeBranch className={styles.iconPurple} />
                    <span>{repo.forks_count}</span>
                  </div>
                  <span>{repo.language}</span>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserPage;
