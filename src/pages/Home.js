import React, { useState } from 'react';
import './Home.css';

function Home() {
    const [appointments, setAppointments] = useState([
        { time: '09:00', name: 'Айбек уулу Нурлан', type: 'Коронка' },
        { time: '11:30', name: 'Айбек уулу Нурлан', type: 'Осмотр' },
        { time: '01:00', name: 'Айбек уулу Нурлан', type: 'Коронка' }
    ]);

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        surname: '',
        name: '',
        type: '',
        time: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fullName = `${formData.surname} ${formData.name}`;
        const newAppointment = {
            time: formData.time,
            name: fullName,
            type: formData.type
        };
        setAppointments([newAppointment, ...appointments]);
        setFormData({ surname: '', name: '', type: '', time: '' });
        setShowForm(false);
    };

    return (
        <div className="home-page">
            <h1 className="page-title">Главное</h1>

            <div className="top-section">
                <div className="card new-appointments">
                    <h3>Новые записи</h3>
                    {appointments.map((item, index) => (
                        <div key={index} className="appointment">
                            <span className="time">{item.time}</span>
                            <span className="name">{item.name}</span>
                            <span className="type">{item.type}</span>
                        </div>
                    ))}
                </div>

                <div className="card reminders">
                    <h3>Напоминания</h3>
                    <ul>
                        <li><span className="dot" /> Повторный прием: мучаев — <small>17 мая</small></li>
                        <li><span className="dot" /> Сделать результат аыльгат анализа Инex</li>
                    </ul>
                </div>
            </div>

            <div className="card actions">
                <h3>Быстрые действия</h3>
                <div className="btn-group">
                    <button onClick={() => setShowForm(true)}>Добавить запись</button>
                    <button>Найти пациента</button>
                    <button>Посмотреть запросы</button>
                </div>
            </div>

            {showForm && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-button" onClick={() => setShowForm(false)}>✖</button>
                        <h3>Добавить запись</h3>
                        <form onSubmit={handleSubmit}>
                            <input
                                name="surname"
                                value={formData.surname}
                                onChange={handleChange}
                                placeholder="фамилия"
                                required
                            />
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="имя"
                                required
                            />
                            <input
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                placeholder="боль"
                                required
                            />
                            <input
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                placeholder="время"
                                required
                            />
                            <button type="submit">Добавить запись</button>
                        </form>
                    </div>
                </div>
            )}

            <div className="card patients">
                <h3>Последние пациенты</h3>
                <div className="patient">
                    <span className="icon">👤</span>
                    <span className="name">Токтосунов Арсен</span>
                    <span className="type">Коронка</span>
                    <span className="date">12.05.2025</span>
                </div>
                <div className="patient">
                    <span className="icon">👤</span>
                    <span className="name">Токтосунов Арсен</span>
                    <span className="type">Коронка</span>
                </div>
            </div>
        </div>
    );
}

export default Home;
