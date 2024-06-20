import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Update() {
  const [inputData, setInputData] = useState({
    id: '',
    name: '',
    email: '',
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3030/users/${id}`)
      .then(response => {
        const user = {
          ...response.data,
          id: response.data.id.toString()
        };
        setInputData(user);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3030/users/${id}`, inputData)
      .then(res => {
        alert("Successfully updated");
        navigate('/');
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div className="container">
      <h1>Update</h1>
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

export default Update;
