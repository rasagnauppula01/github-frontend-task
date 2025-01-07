const API_BASE_URL = "https://github-backend-task.onrender.com/api";

export const getUser = async (username) => {
  
  const response = await fetch(`${API_BASE_URL}/users/${username}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user", response);
  }
  return response.json();
};

export const getUserRepos = async (username) => {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch repositories");
  }
  return response.json();
};

export const getRepository = async (username, repo) => {
  const response = await fetch(
    `https://api.github.com/repos/${username}/${repo}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch repository");
  }
  return response.json();
};

export const getFollowers = async (username) => {
  const response = await fetch(`${API_BASE_URL}/users/${username}/followers`);
  if (!response.ok) {
    throw new Error("Failed to fetch followers");
  }
  return response.json();
};

export const getMutualFollowers = async (username) => {
  const response = await fetch(
    `${API_BASE_URL}/users/${username}/mutual-followers`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch mutual followers");
  }
  return response.json();
};

export const searchUsers = async (query) => {
  const response = await fetch(
    `${API_BASE_URL}/users?${new URLSearchParams(query)}`
  );
  if (!response.ok) {
    throw new Error("Failed to search users");
  }
  return response.json();
};

export const updateUser = async (username, data) => {
  const response = await fetch(`${API_BASE_URL}/users/${username}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update user");
  }
  return response.json();
};

export const deleteUser = async (username) => {
  const response = await fetch(`${API_BASE_URL}/users/${username}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
  return response.json();
};
