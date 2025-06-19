import React, { useState } from 'react';
import './Patients.css';

function Patients() {
    const [patients, setPatients] = useState([
        {
            name: 'Иван Иванов',
            birth: '23.11.1975',
            lastVisit: '10 апр. 2024',
            photo: 'фото'
        }
    ]);

    const [formData, setFormData] = useState({
        name: '',
        birth: '',
        lastVisit: '',
        photo: 'фото'
    });

    const [showForm, setShowForm] = useState(false);
    const [search, setSearch] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setPatients([formData, ...patients]);
        setFormData({ name: '', birth: '', lastVisit: '', photo: 'фото' });
        setShowForm(false);
    };

    return (
        <div className="patients-page">
            <h1 className="page-title">Пациенты</h1>

            <div className="patients-actions">
                <button className="add-btn" onClick={() => setShowForm(true)}>Добавить пациента</button>
                <div className="search-block">
                    <input
                        type="text"
                        placeholder="Поиск пациента"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="patients-list">
                {patients
                    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
                    .map((p, i) => (
                        <div className="patient-card" key={i}>
                            <div className="photo-block">{p.photo}</div>
                            <div className="info">
                                <strong>{p.name}</strong>
                                <div>{p.birth}</div>
                            </div>
                            <div className="visit">Удаление зуба: {p.lastVisit}</div>
                            <button className="open-btn">Открыть</button>
                        </div>
                    ))}
            </div>

            {showForm && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-button" onClick={() => setShowForm(false)}>✖</button>
                        <h3>Добавить пациента</h3>
                        <form onSubmit={handleSubmit}>
                            <input name="name" placeholder="ФИО" value={formData.name} onChange={handleChange} required />
                            <input name="birth" placeholder="Дата рождения" value={formData.birth} onChange={handleChange} required />
                            <input name="lastVisit" placeholder="Дата посещения" value={formData.lastVisit} onChange={handleChange} required />
                            <button type="submit">Добавить</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Patients;
