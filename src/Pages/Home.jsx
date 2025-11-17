import { useEffect, useState, useCallback } from "react";
import "./Home.css";
import { Card, Spinner } from "react-bootstrap";
import axios from "axios";

const API_URL = "https://68dcd02d7cd1948060ab6364.mockapi.io/users";

const Home = () => {
  const [userCount, setUserCount] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserCount = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setUserCount(res.data.length);
    } catch (err) {
      console.error("Error fetching user count:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserCount();
  }, [fetchUserCount]);

  return (
    <div className="p-3">
      <h2 className="mb-4 fw-bold text-dark">Welcome, Jane Doe 👋🏻</h2>

      <div className="row g-3">
        {/* Total Members */}
        <div className="col-md-4">
          <Card className="shadow-sm border-0 p-3 text-center">
            <h5 className="text-muted">Total Team Members</h5>
            <h2 className="fw-bold text-primary">
              {loading ? <Spinner animation="border" size="sm" /> : userCount}
            </h2>
          </Card>
        </div>

        {/* Active Projects */}
        <div className="col-md-4">
          <Card className="shadow-sm border-0 p-3 text-center">
            <h5 className="text-muted">Active Projects</h5>
            <h2 className="fw-bold text-success">
              {loading ? <Spinner animation="border" size="sm" /> : 7}
            </h2>
          </Card>
        </div>

        {/* Pending Tasks */}
        <div className="col-md-4">
          <Card className="shadow-sm border-0 p-3 text-center">
            <h5 className="text-muted">Pending Tasks</h5>
            <h2 className="fw-bold text-warning">
              {loading ? <Spinner animation="border" size="sm" /> : 15}
            </h2>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
