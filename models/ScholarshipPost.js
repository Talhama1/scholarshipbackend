import React, { useState } from 'react';

const ScholarshipForm = ({ onScholarshipAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    region: '',
    fundingType: '',
    degreeType: '',
    deadline: '',
    imageUrl1: '',
    imageUrl2: '',
    imageUrl3: '',
    applyLink: '',
    scholarshipDetails: '',
  });

  const [deleteName, setDeleteName] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/123/scholarship', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Upload failed');
      const result = await response.json();

      alert('✅ Scholarship added!');
      onScholarshipAdded(result);

      setFormData({
        name: '',
        region: '',
        fundingType: '',
        degreeType: '',
        deadline: '',
        imageUrl1: '',
        imageUrl2: '',
        imageUrl3: '',
        applyLink: '',
        scholarshipDetails: '',
      });
    } catch (err) {
      alert('❌ Error: ' + err.message);
    }
  };

  const handleDelete = async () => {
    if (!deleteName.trim()) {
      return alert('Please enter a scholarship name to delete.');
    }

    if (!window.confirm(`Are you sure you want to delete "${deleteName}"?`)) return;

    try {
      const response = await fetch(`http://localhost:3000/123/scholarship/by-name/${encodeURIComponent(deleteName)}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || 'Delete failed');
      alert(`🗑️ ${result.message}`);

      setDeleteName('');
    } catch (err) {
      alert('❌ Error: ' + err.message);
    }
  };

  return (
    <div style={{ marginBottom: '30px' }}>
      <form onSubmit={handleSubmit}>
        <h2>Add Scholarship</h2>

        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="region" placeholder="Region" value={formData.region} onChange={handleChange} required />
        <input name="fundingType" placeholder="Funding Type" value={formData.fundingType} onChange={handleChange} required />
        <input name="degreeType" placeholder="Degree Type" value={formData.degreeType} onChange={handleChange} required />
        <input name="deadline" type="date" placeholder="Deadline" value={formData.deadline} onChange={handleChange} />

        <input name="imageUrl1" placeholder="Image URL 1" value={formData.imageUrl1} onChange={handleChange} required />
        <input name="imageUrl2" placeholder="Image URL 2" value={formData.imageUrl2} onChange={handleChange} />
        <input name="imageUrl3" placeholder="Image URL 3" value={formData.imageUrl3} onChange={handleChange} />

        <input name="applyLink" placeholder="Apply Link" value={formData.applyLink} onChange={handleChange} />
        <textarea
          name="scholarshipDetails"
          placeholder="Scholarship Details"
          value={formData.scholarshipDetails}
          onChange={handleChange}
          rows="4"
        ></textarea>

        <button type="submit">Submit</button>
      </form>

      <hr style={{ margin: '20px 0' }} />

      <h2>Delete Scholarship by Name</h2>
      <input
        type="text"
        placeholder="Enter scholarship name"
        value={deleteName}
        onChange={(e) => setDeleteName(e.target.value)}
      />
      <button onClick={handleDelete} style={{ marginLeft: '10px' }}>
        Delete
      </button>
    </div>
  );
};

export default ScholarshipForm;
