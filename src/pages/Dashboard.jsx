import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/students"
          className="bg-blue-500 text-white p-4 rounded shadow-md hover:bg-blue-600 transition"
        >
          <h2 className="text-xl font-bold">Manage Students</h2>
        </Link>
        <Link
          to="/teachers"
          className="bg-green-500 text-white p-4 rounded shadow-md hover:bg-green-600 transition"
        >
          <h2 className="text-xl font-bold">Manage Teachers</h2>
        </Link>
        <Link
          to="/majors"
          className="bg-purple-500 text-white p-4 rounded shadow-md hover:bg-purple-600 transition"
        >
          <h2 className="text-xl font-bold">Manage Majors</h2>
        </Link>
        <Link
          to="/schedules"
          className="bg-red-500 text-white p-4 rounded shadow-md hover:bg-red-600 transition"
        >
          <h2 className="text-xl font-bold">Manage Schedules</h2>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
