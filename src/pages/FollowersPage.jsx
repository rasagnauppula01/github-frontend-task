import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getFollowers } from '../services/api';
import styles from './FollowersPage.module.css';

const FollowersPage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const data = await getFollowers(username);
        setFollowers(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
  }, [username]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => navigate(`/user/${username}`)} className={styles.backButton}>
          Back to User
        </button>
        <h1>Followers of {username}</h1>
      </div>

      <div className={styles.followersList}>
        {followers.map(follower => (
          <Link
            key={follower.id}
            to={`/user/${follower.login}`}
            className={styles.followerCard}
          >
            <img
              src={follower.avatar_url}
              alt={follower.login}
              className={styles.avatar}
            />
            <div className={styles.followerInfo}>
              <h3>{follower.login}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FollowersPage;