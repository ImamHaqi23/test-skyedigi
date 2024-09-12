import { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import { addData, updateData, deleteData, getAllData } from '../lib/service';
import { MdAddCircle, MdEdit, MdDelete } from 'react-icons/md';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState({
    name: '',
    gender: '',
    address: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const data = await getAllData('students');
    setStudents(data);
  };

  const handleAddClick = () => {
    setSelectedStudent({ name: '', gender: '', address: '' });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    await deleteData('students', id);
    setStudents(students.filter((student) => student.id !== id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      await updateData('students', selectedStudent.id, selectedStudent);
      setStudents(
        students.map((student) =>
          student.id === selectedStudent.id
            ? { ...student, ...selectedStudent }
            : student
        )
      );
    } else {
      const id = await addData('students', selectedStudent);
      setStudents([...students, { ...selectedStudent, id }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Students</h1>
      <button
        onClick={handleAddClick}
        className="bg-blue-600 text-white p-2 rounded mb-4 flex items-center gap-2 hover:bg-blue-700"
      >
        <MdAddCircle />
        Add Student
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
          {students.map((student, index) => (
            <tr key={student.id}>
              <td className="border p-2 ">{index + 1}</td>
              <td className="border p-2">{student.name}</td>
              <td className="border p-2">{student.gender}</td>
              <td className="border p-2">{student.address}</td>
              <td className="border p-2 flex justify-center">
                <button
                  onClick={() => handleEditClick(student)}
                  className="bg-green-500 text-white p-2 w-20  rounded mr-3 flex items-center justify-center gap-1 hover:bg-green-600"
                >
                  <MdEdit /> Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(student.id)}
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
          {isEditing ? 'Edit' : 'Add'} Student
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={selectedStudent.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Gender</label>
            <select
              name="gender"
              value={selectedStudent.gender}
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
              value={selectedStudent.address}
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

export default Students;
