import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import { addData, updateData, deleteData, getAllData } from '../lib/service';
import { MdAddCircle, MdEdit, MdDelete } from 'react-icons/md';

const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const dayName = days[date.getDay()];
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;

  const startTime = formattedTime;
  const endTime = `${(hours + 2).toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;

  return `${dayName}, ${startTime} - ${endTime} WIB`;
};

const Schedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [majors, setMajors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState({
    studentId: '',
    teacherId: '',
    majorId: '',
    schedules: '',
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    const [schedulesData, studentsData, teachersData, majorsData] =
      await Promise.all([
        getAllData('schedules'),
        getAllData('students'),
        getAllData('teachers'),
        getAllData('majors'),
      ]);
    setSchedules(schedulesData);
    setStudents(studentsData);
    setTeachers(teachersData);
    setMajors(majorsData);
  };

  const handleAddClick = () => {
    setCurrentSchedule({
      studentId: '',
      teacherId: '',
      majorId: '',
      schedules: '',
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditClick = (schedule) => {
    setCurrentSchedule(schedule);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    await deleteData('schedules', id);
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentSchedule((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedSchedule = {
      ...currentSchedule,
      schedules: new Date(currentSchedule.schedules).toISOString(),
    };

    if (isEditing) {
      await updateData('schedules', currentSchedule.id, updatedSchedule);
      setSchedules(
        schedules.map((schedule) =>
          schedule.id === currentSchedule.id ? updatedSchedule : schedule
        )
      );
    } else {
      const id = await addData('schedules', updatedSchedule);
      setSchedules([...schedules, { ...updatedSchedule, id }]);
    }
    setIsModalOpen(false);
  };

  const getDisplayName = (id, data, key) => {
    const item = data.find((item) => item.id === id);
    return item ? item[key] : 'Unknown';
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Schedules</h1>
      <button
        onClick={handleAddClick}
        className="bg-blue-600 text-white p-2 rounded mb-4 flex items-center gap-2 hover:bg-blue-700"
      >
        <MdAddCircle />
        Add Schedule
      </button>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Student</th>
            <th className="border p-2">Teacher</th>
            <th className="border p-2">Major</th>
            <th className="border p-2">Schedules</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule, index) => (
            <tr key={schedule.id}>
              <td className="border p-2 ">{index + 1}</td>
              <td className="border p-2">
                {getDisplayName(schedule.studentId, students, 'name')}
              </td>
              <td className="border p-2">
                {getDisplayName(schedule.teacherId, teachers, 'name')}
              </td>
              <td className="border p-2">
                {getDisplayName(schedule.majorId, majors, 'name')}
              </td>
              <td className="border p-2">
                {formatDateTime(schedule.schedules)}
              </td>
              <td className="border p-2 flex justify-center">
                <button
                  onClick={() => handleEditClick(schedule)}
                  className="bg-green-500 text-white p-2 w-20  rounded mr-3 flex items-center justify-center gap-1 hover:bg-green-600"
                >
                  <MdEdit /> Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(schedule.id)}
                  className="bg-red-500 text-white p-2 w-20  rounded mr-3 flex items-center justify-center gap-1 hover:bg-red-600"
                >
                  <MdDelete />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isEditing ? 'Edit' : 'Add'} Schedule
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Student</label>
            <select
              name="studentId"
              value={currentSchedule.studentId}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Student</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Teacher</label>
            <select
              name="teacherId"
              value={currentSchedule.teacherId}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Major</label>
            <select
              name="majorId"
              value={currentSchedule.majorId}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Major</option>
              {majors.map((major) => (
                <option key={major.id} value={major.id}>
                  {major.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Schedules</label>
            <input
              type="datetime-local"
              name="schedules"
              value={
                currentSchedule.schedules
                  ? new Date(currentSchedule.schedules)
                      .toISOString()
                      .slice(0, 16)
                  : ''
              }
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Schedules;
