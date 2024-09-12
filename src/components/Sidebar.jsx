import {
  MdLogout,
  MdDashboard,
  MdAutoStories,
  MdSchedule,
} from 'react-icons/md';
import { PiStudentFill } from 'react-icons/pi';
import { GiTeacher } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Sidebar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState('dashboard');

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="w-64 bg-blue-900 text-white h-full flex flex-col">
      <div className="p-4 text-lg font-bold">SMK Skye Digipreneur</div>
      <nav className="flex-1">
        <ul>
          <li
            className={`p-4 font-semibold ${
              active === 'dashboard' ? 'bg-blue-700' : ''
            }`}
          >
            <Link
              to="/dashboard"
              onClick={() => setActive('dashboard')}
              className="flex items-center gap-2"
            >
              <MdDashboard />
              Dashboard
            </Link>
          </li>
          <li
            className={`p-4 font-semibold ${
              active === 'students' ? 'bg-blue-700' : ''
            }`}
          >
            <Link
              to="/students"
              onClick={() => setActive('students')}
              className="flex items-center gap-2"
            >
              <PiStudentFill />
              Students
            </Link>
          </li>
          <li
            className={`p-4 font-semibold ${
              active === 'teachers' ? 'bg-blue-700' : ''
            }`}
          >
            <Link
              to="/teachers"
              onClick={() => setActive('teachers')}
              className="flex items-center gap-2"
            >
              <GiTeacher />
              Teachers
            </Link>
          </li>
          <li
            className={`p-4 font-semibold ${
              active === 'majors' ? 'bg-blue-700' : ''
            }`}
          >
            <Link
              to="/majors"
              onClick={() => setActive('majors')}
              className="flex items-center gap-2"
            >
              <MdAutoStories />
              Majors
            </Link>
          </li>
          <li
            className={`p-4 font-semibold ${
              active === 'schedules' ? 'bg-blue-700' : ''
            }`}
          >
            <Link
              to="/schedules"
              onClick={() => setActive('schedules')}
              className="flex items-center gap-2"
            >
              <MdSchedule />
              Schedules
            </Link>
          </li>
        </ul>
      </nav>
      <button
        className="p-3 bg-red-600 hover:bg-red-700 flex justify-center items-center gap-2"
        onClick={handleLogout}
      >
        <MdLogout />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
