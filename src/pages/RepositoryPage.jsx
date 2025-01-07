import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRepository } from '../services/api';
import styles from './RepositoryPage.module.css';

function RepositoryPage() {
  const { username, repo } = useParams();
  const navigate = useNavigate();
  const [repository, setRepository] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const data = await getRepository(username, repo);
        setRepository(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepo();
  }, [username, repo]);

  if (loading) return <div>Loading...</div>;
  if (!repository) return <div>Repository not found</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => navigate(`/user/${username}`)} className={styles.backButton}>
          Back to User
        </button>
      </div>

      <div className={styles.repoInfo}>
        <h1>{repository.name}</h1>
        <p className={styles.description}>{repository.description}</p>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span>⭐ Stars</span>
            <strong>{repository.stargazers_count}</strong>
          </div>
          <div className={styles.stat}>
            <span>🔄 Forks</span>
            <strong>{repository.forks_count}</strong>
          </div>
          <div className={styles.stat}>
            <span>👀 Watchers</span>
            <strong>{repository.watchers_count}</strong>
          </div>
        </div>

        <div className={styles.details}>
          <p>Language: {repository.language}</p>
          <p>Created: {new Date(repository.created_at).toLocaleDateString()}</p>
          <p>Last updated: {new Date(repository.updated_at).toLocaleDateString()}</p>
        </div>

        <a href={repository.html_url} target="_blank" rel="noopener noreferrer" className={styles.githubLink}>
          View on GitHub
        </a>
      </div>
    </div>
  );
}

export default RepositoryPage;