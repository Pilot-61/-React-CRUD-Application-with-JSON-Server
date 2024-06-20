import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function Create() {
  const [inputData, setInputData] = useState({
    id: '',
    name: '',
    email: '',
  });
  const [maxId, setMaxId] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3030/users')
      .then(response => {
        const users = response.data.map(user => ({
          ...user,
          id: user.id.toString()
        }));
        const maxId = Math.max(...users.map(user => parseInt(user.id, 10)), 0);
        setMaxId(maxId);
        setInputData(prevData => ({ ...prevData, id: (maxId + 1).toString() }));
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3030/users', inputData)
      .then(res => {
        alert("Successfully added");
        navigate('/');
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div className="container">
      <h1>Create</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="id" className="form-label">ID:</label>
          <input type="text" className="form-control" value={inputData.id} disabled />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Enter your name:</label>
          <input type="text" className="form-control" value={inputData.name} onChange={e => setInputData(prevData => ({ ...prevData, name: e.target.value }))} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Enter your email:</label>
          <input type="email" className="form-control" value={inputData.email} onChange={e => setInputData(prevData => ({ ...prevData, email: e.target.value }))} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
