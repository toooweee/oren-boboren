import React, { useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const handleLogin = async () => {
		try {
			await axios.post('http://localhost:5000/api/auth/login', { email, password });
			setIsAuthenticated(true);
		} catch (error) {
			console.error('Invalid credentials');
		}
	};

	const handleLogout = async () => {
		try {
			await axios.post('http://localhost:5000/api/auth/logout');
			setIsAuthenticated(false);
		} catch (error) {
			console.error('Logout failed');
		}
	};

	if (!isAuthenticated) {
		return (
			<div>
				<h1>Login</h1>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button onClick={handleLogin}>Login</button>
			</div>
		);
	}

	return (
		<div>
			<h1>Административная панель</h1>
			<button onClick={handleLogout}>Logout</button>
			<button onClick={exportUsersToExcel}>Выгрузить пользователей</button>
			<button onClick={exportEventsToExcel}>Выгрузить события</button>
		</div>
	);
};

export default AdminPanel;
