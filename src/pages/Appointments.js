import React, { useState } from 'react';
import './appointments.css';

export default function Appointments() {
    const [records, setRecords] = useState([
        { time: '09:00', name: 'Иван Иванов', procedure: 'Пломбирование', status: 'Подтвержден' },
        { time: '09:00', name: 'Иван Иванов', procedure: 'Пломбирование', status: 'Ожидания' },
        { time: '09:00', name: 'Иван Иванов', procedure: 'Пломбирование', status: 'Отменен' },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ time: '', name: '', surname: '' });
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const addRecord = () => {
        if (!form.time || !form.name || !form.surname) {
            alert('Пожалуйста, заполните все поля');
            return;
        }
        const fullName = `${form.name} ${form.surname}`;
        setRecords([...records, { time: form.time, name: fullName, procedure: 'Пломбирование', status: 'Подтвержден' }]);
        setForm({ time: '', name: '', surname: '' });
        setShowModal(false);
    };

    // Фильтруем записи по поисковому запросу (по имени/фамилии)
    const filteredRecords = records.filter(rec =>
        rec.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="app-container">
            <h2 className="title">Записи</h2>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Поиск по имени или фамилии"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <button onClick={() => setSearchTerm('')}>Сбросить</button>
            </div>

            <table className="records-table">
                <thead>
                <tr>
                    <th>Время</th>
                    <th>Пациент</th>
                    <th>Процедура</th>
                    <th>Статус</th>
                </tr>
                </thead>
                <tbody>
                {filteredRecords.length > 0 ? (
                    filteredRecords.map((rec, index) => (
                        <tr key={index}>
                            <td>{rec.time}</td>
                            <td>{rec.name}</td>
                            <td>{rec.procedure}</td>
                            <td className="status-link">{rec.status}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" style={{ textAlign: 'center' }}>Нет записей</td>
                    </tr>
                )}
                </tbody>
            </table>

            <button className="open-modal-button" onClick={() => setShowModal(true)}>
                Добавить запись
            </button>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-button" onClick={() => setShowModal(false)}>×</button>
                        <h3>Добавить запись</h3>
                        <input
                            type="text"
                            name="time"
                            placeholder="Время (например, 10:00)"
                            value={form.time}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="name"
                            placeholder="Имя"
                            value={form.name}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="surname"
                            placeholder="Фамилия"
                            value={form.surname}
                            onChange={handleInputChange}
                        />
                        <button className="add-button" onClick={addRecord}>Добавить</button>
                    </div>
                </div>
            )}
        </div>
    );
}
