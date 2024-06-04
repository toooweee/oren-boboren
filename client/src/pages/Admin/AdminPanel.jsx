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

	const exportUsersToExcel = async () => {
		try {
			const response = await axios.get('http://localhost:5000/api/user/export/users', {
				responseType: 'blob',
			});
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'users.xlsx');
			document.body.appendChild(link);
			link.click();
		} catch (error) {
			console.error('Failed to export users:', error);
		}
	};

	const exportEventsToExcel = async () => {
		try {
			const response = await axios.get('http://localhost:5000/api/event/export/events', {
				responseType: 'blob',
			});
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'events.xlsx');
			document.body.appendChild(link);
			link.click();
		} catch (error) {
			console.error('Failed to export events:', error);
		}
	};

	const containerStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100vh',
		fontFamily: 'Arial, sans-serif',
	};

	const formStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '20px',
		border: '1px solid #ddd',
		borderRadius: '10px',
		boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
	};

	const inputStyle = {
		marginBottom: '10px',
		padding: '10px',
		width: '200px',
		borderRadius: '5px',
		border: '1px solid #ddd',
	};

	const buttonStyle = {
		marginBottom: '10px',
		padding: '10px 20px',
		width: '220px',
		borderRadius: '5px',
		border: 'none',
		backgroundColor: '#007bff',
		color: '#fff',
		cursor: 'pointer',
		fontSize: '16px',
	};

	const headerStyle = {
		marginBottom: '20px',
		fontSize: '24px',
		color: '#333',
	};

	if (!isAuthenticated) {
		return (
			<div style={containerStyle}>
				<div style={formStyle}>
					<h1 style={headerStyle}>Login</h1>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						style={inputStyle}
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						style={inputStyle}
					/>
					<button onClick={handleLogin} style={buttonStyle}>Login</button>
				</div>
			</div>
		);
	}

	return (
		<div style={containerStyle}>
			<div style={formStyle}>
				<h1 style={headerStyle}>Административная панель</h1>
				<button onClick={handleLogout} style={buttonStyle}>Выйти</button>
				<button onClick={exportUsersToExcel} style={buttonStyle}>Выгрузить пользователей</button>
				<button onClick={exportEventsToExcel} style={buttonStyle}>Выгрузить события</button>
			</div>
		</div>
	);
};

export default AdminPanel;
