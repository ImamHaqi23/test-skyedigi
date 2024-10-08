import { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import { addData, updateData, deleteData, getAllData } from '../lib/service';
import { MdAddCircle, MdEdit, MdDelete } from 'react-icons/md';

const Majors = () => {
  const [majors, setMajors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState({ name: '', desc: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchMajors();
  }, []);

  const fetchMajors = async () => {
    const data = await getAllData('majors');
    setMajors(data);
    console.log(data);
  };

  const handleAddClick = () => {
    setSelectedMajor({ name: '', desc: '' });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditClick = (major) => {
    setSelectedMajor(major);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    await deleteData('majors', id);
    setMajors(majors.filter((major) => major.id !== id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedMajor((prevMajor) => ({ ...prevMajor, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      await updateData('majors', selectedMajor.id, selectedMajor);
      setMajors(
        majors.map((major) =>
          major.id === selectedMajor.id ? { ...major, ...selectedMajor } : major
        )
      );
    } else {
      const id = await addData('majors', selectedMajor);
      setMajors([...majors, { ...selectedMajor, id }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Majors</h1>
      <button
        onClick={handleAddClick}
        className="bg-blue-600 text-white p-2 rounded mb-4 flex items-center gap-2 hover:bg-blue-700"
      >
        <MdAddCircle />
        Add Major
      </button>
      <table className="w-full border-collapse ">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">No</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {majors.map((major, index) => (
            <tr key={major.id}>
              <td className="border p-2 ">{index + 1}</td>
              <td className="border p-2 ">{major.name}</td>
              <td className="border p-2 ">{major.desc}</td>
              <td className="border p-2 flex justify-center">
                <button
                  onClick={() => handleEditClick(major)}
                  className="bg-green-500 text-white p-2 w-20 rounded mr-3 flex items-center justify-center gap-1 hover:bg-green-600"
                >
                  <MdEdit />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(major.id)}
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
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isEditing ? 'Edit' : 'Add'} Major
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={selectedMajor.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Description</label>
            <textarea
              name="desc"
              value={selectedMajor.desc}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="3"
            ></textarea>
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

export default Majors;
