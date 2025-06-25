import { data } from 'react-router-dom';
import './Home.css';
import React, { useState, useEffect } from 'react';




function Home() {
    
    const [appointments, setAppointments] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        surname: '',
        name: '',
        type: '',
        time: ''
    });
    const [unreadMessages, setunreadMessages] = useState([])
    
      useEffect(() => {
      fetch('https://gist.githubusercontent.com/beibarsUmirzakov/a7fa7c1ff2d17b4a08e961260a90b514/raw/a8aacc49bc2922d0b703e2b43ce59b20ed1b62a5/gistfile1.txt') // update URL to match your backend
      .then(res => res.json())
      .then(data => {
        console.log('Fetched data:', data.allMeetings);
        setAppointments(data.allMeetings || []);
        setunreadMessages(data.unread || []);
        console.log(data.unread)
    })
      .catch(err => console.error('Error fetching appointments:', err));
  }, []);



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
                    {appointments.map((item, index) => 
                    
                    {
                        const dateStr = `1970-01-01T${item.date}`;
                        const date = new Date(dateStr);
                        const formatter = new Intl.DateTimeFormat([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    });
                        const formattedTime = isNaN(date.getTime()) ? item.date : formatter.format(date);

                    return(                  
                        <div key={index} className="appointment">
                            <span className="time">{formattedTime}</span>
                            <span className="name">{item.pacient}</span>
                            <span className="type">{item.title}</span>
                        </div>
                    )
                    })}
                </div>

                <div className="card reminders">
                    <h3>Напоминания</h3>
                    <ul>
                        {unreadMessages.map((item,index) => {
                                const dateStr = item.time;
                                const date = new Date(dateStr);
                                const formatter = new Intl.DateTimeFormat([], {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false
                                });
                            const formattedTime = formatter.format(date);

                            return(
                            <div key={index} className='messages'>
                                <li className='time'>{formattedTime}</li>
                                <li className='sender'>{item.sender}</li>
                                <li className='text'>{item.text}</li>
                            </div>
                        )
                        }
                        )}
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
