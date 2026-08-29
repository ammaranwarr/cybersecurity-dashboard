import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check local storage for existing session
    const storedUser = localStorage.getItem('demo_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('demo_user');
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Demo authentication check
    if (email === 'admin@example.com' && password === 'admin123') {
      const userData = {
        id: '1',
        name: 'Demo Admin',
        email: 'admin@example.com',
        role: 'Administrator',
        avatar: 'https://ui-avatars.com/api/?name=Demo+Admin&background=8b5cf6&color=fff'
      };
      setUser(userData);
      localStorage.setItem('demo_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials. Please use the demo credentials.' };
  };

  const register = (name, email, password) => {
    // Mock registration
    const userData = {
      id: Date.now().toString(),
      name,
      email,
      role: 'Analyst',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=8b5cf6&color=fff`
    };
    setUser(userData);
    localStorage.setItem('demo_user', JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('demo_user');
    navigate('/login');
  };

  const updateUser = (updatedFields) => {
    const updatedUser = { ...user, ...updatedFields };
    setUser(updatedUser);
    localStorage.setItem('demo_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
