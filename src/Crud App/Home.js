import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import axios from 'axios';
import { Link } from 'react-router-dom';

export function Home() {
  const [data, setData] = useState([]);
  const [maxId, setMaxId] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3030/users')
      .then(response => {
        const users = response.data.map(user => ({
          ...user,
          id: user.id.toString()
        }));
        setData(users);
        const maxId = Math.max(...users.map(user => parseInt(user.id, 10)), 0);
        setMaxId(maxId);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleDelete = (id) => {
    const cnf = window.confirm("are you sure ?");
    if(cnf) {
    axios.delete(`http://localhost:3030/users/${id}`)
      .then(response => {
        alert("Successfully deleted");
        setData(data.filter(user => user.id !== id));
      })
      .catch(error => {
        console.error(error);
      });
    }
  };

  return (
    <div className="container">
      <h1>Home</h1>
      <Link to='/create' className='btn btn-primary mb-3'>Create</Link>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <Link to={`/update/${item.id}`} className="btn btn-primary me-2">Edit</Link>
                  <button onClick={() => handleDelete(item.id)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
