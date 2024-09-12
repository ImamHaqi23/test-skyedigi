import { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import { addData, updateData, deleteData, getAllData } from '../lib/service';
import { MdAddCircle, MdEdit, MdDelete } from 'react-icons/md';

const Teacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState({
    name: '',
    gender: '',
    address: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    const data = await getAllData('teachers');
    setTeachers(data);
  };

  const handleAddClick = () => {
    setSelectedTeacher({ name: '', gender: '', address: '' });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditClick = (teacher) => {
    setSelectedTeacher(teacher);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    await deleteData('teachers', id);
    setTeachers(teachers.filter((teacher) => teacher.id !== id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedTeacher((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateData('teachers', selectedTeacher.id, selectedTeacher);
      setTeachers(
        teachers.map((teacher) =>
          teacher.id === selectedTeacher.id
            ? { ...teacher, ...selectedTeacher }
            : teacher
        )
      );
    } else {
      const id = await addData('teachers', selectedTeacher);
      setTeachers([...teachers, { ...selectedTeacher, id }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Teachers</h1>
      <button
        onClick={handleAddClick}
        className="bg-blue-600 text-white p-2 rounded mb-4 flex items-center gap-2 hover:bg-blue-700"
      >
        <MdAddCircle />
        Add Teacher
      </button>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Gender</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td className="border p-2">{teacher.name}</td>
              <td className="border p-2">{teacher.gender}</td>
              <td className="border p-2">{teacher.address}</td>
              <td className="border p-2 flex justify-center">
                <button
                  onClick={() => handleEditClick(teacher)}
                  className="bg-green-500  hover:bg-green-600 text-white p-2 w-20 rounded mr-3 flex items-center justify-center gap-1"
                >
                  <MdEdit /> Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(teacher.id)}
                  className="bg-red-500 text-white p-2 w-20 rounded mr-3 flex items-center justify-center gap-1 hover:bg-red-600"
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
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={selectedTeacher.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Gender</label>
            <select
              name="gender"
              value={selectedTeacher.gender}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={selectedTeacher.address}
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

export default Teacher;
