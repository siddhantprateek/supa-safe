import React, { useContext, useState} from 'react';
import './App.css';
import { AuthContext, supabase } from './context/auth.context';

function App() {
  const [email, setEmail] = useState<string>("");
  const session = useContext(AuthContext);
  const [msg, setMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

	const handleLogin = async (e: any) => {
		e.preventDefault();

		try {
			setLoading(true);
			const { error } = await supabase.auth.signInWithOtp({ email });

			if (error) {
				setMsg(error.message);
			} else {
				setMsg('Check your emails now!');
			}
		} catch (error: any) {
			setMsg(error.error_description || error.message);
		} finally {
			setLoading(false);
		}
	};
  console.log(session)
	return (
		<div>
			<h1>Authentication</h1>
			<p className="description">Sign in via magic link with your email below</p>
			{loading ? (
				'Sending magic link...'
			) : (
				<form onSubmit={handleLogin}>
					<label htmlFor="email">Email:</label>
					<input
						id="email"
						className="input"
						type="email"
						placeholder="Your email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<button className="button">Get Magic Link</button>
				</form>
			)}
			<p className="message">{msg}</p>
		</div>
	);
}

export default App;
