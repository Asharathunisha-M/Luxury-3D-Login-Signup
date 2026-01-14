import React, { useState, useEffect } from 'react';
import './App.css';

/**
 * Aruba Networks Technical Evaluation
 * Features: Layered Aesthetic Parallax, 3D Floating Tilt, Form Validations
 */
function App() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle Multi-layer Parallax and Tilt logic
  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX - window.innerWidth / 2) / 30;
      const y = (e.clientY - window.innerHeight / 2) / 30;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="app-viewport">
      {/* BACKGROUND LAYERS: Aesthetic Brown Textures */}
      <div 
        className="parallax-layer layer-deep" 
        style={{ transform: `translate(${mousePos.x * -0.6}px, ${mousePos.y * -0.6}px) scale(1.1)` }}
      ></div>
      <div 
        className="parallax-layer layer-mid" 
        style={{ transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)` }}
      ></div>

      {/* FLOATING 3D FORM */}
      <div 
        className={`auth-wrapper ${isFlipped ? 'is-flipped' : ''}`}
        style={{ 
          transform: `rotateX(${mousePos.y * -0.2}deg) rotateY(${mousePos.x * 0.2}deg)` 
        }}
      >
        <div className="card-inner">
          {/* LOGIN PAGE */}
          <div className="card-face face-front">
            <h1 className="brand-header">SYSTEM LOGIN</h1>
            <LoginForm onSwitch={() => setIsFlipped(true)} />
          </div>

          {/* SIGNUP PAGE */}
          <div className="card-face face-back">
            <h1 className="brand-header">NODE REGISTRY</h1>
            <SignupForm onSwitch={() => setIsFlipped(false)} />
          </div>
        </div>
      </div>
    </div>
  );
}

const LoginForm = ({ onSwitch }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.includes('@')) alert("Valid Email Required");
    else if (pass.length < 1) alert("Password Required");
    else alert("Access Granted");
  };

  return (
    <form className="luxury-form" onSubmit={handleLogin}>
      <input type="email" placeholder="Email Address" required onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" required onChange={e => setPass(e.target.value)} />
      <button className="gold-btn">INITIALIZE</button>
      <p className="toggle-msg">New Node? <span onClick={onSwitch}>Register</span></p>
    </form>
  );
};

const SignupForm = ({ onSwitch }) => {
  const [data, setData] = useState({ name: '', email: '', pass: '' });

  const handleSignup = (e) => {
    e.preventDefault();
    if (data.name.length < 2) alert("Name Required");
    else if (!data.email.includes('@')) alert("Valid Email Required");
    else if (data.pass.length < 6) alert("Security key must be 6+ characters");
    else alert("Registry Successful");
  };

  return (
    <form className="luxury-form" onSubmit={handleSignup}>
      <input type="text" placeholder="Full Name" required onChange={e => setData({...data, name: e.target.value})} />
      <input type="email" placeholder="Email Address" required onChange={e => setData({...data, email: e.target.value})} />
      <input type="password" placeholder="Create Password" required onChange={e => setData({...data, pass: e.target.value})} />
      <button className="gold-btn">CREATE ACCOUNT</button>
      <p className="toggle-msg">Already Registered? <span onClick={onSwitch}>Login</span></p>
    </form>
  );
};

export default App;