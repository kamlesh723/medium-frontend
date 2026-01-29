import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Logo } from '../components/Logo';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { registerUser } from '../lib/authApi';

/**
 * Signup Page Component
 * 
 * Handles user registration with backend API
 * - Form validation (name, email, password)
 * - Password strength check (min 6 characters)
 * - JWT token storage on successful registration
 * - Redirects to feed after signup
 * - Error handling with toast notifications
 */
export function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  /**
   * Handle signup form submission
   * Makes API call to backend register endpoint
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!name || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      // Call backend register API
      const response = await registerUser({
        name,
        email,
        password
      });
      
      // Extract token and user from response
      const { token, user } = response.data;
      
      // Store token and user in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Update auth context
      setUser(user);
      
      // Show success message
      toast.success('Account created successfully!');
      
      // Redirect to feed
      navigate('/feed');
      
    } catch (error) {
      // Handle API errors
      console.error('Signup error:', error);
      const errorMessage = error.response?.data?.message || 'Signup failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Logo */}
      <div className="container-main py-6">
        <Logo />
      </div>
      
      {/* Signup Form */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h1 className="text-3xl font-bold text-gray-950 mb-2 text-center">
              Join Medium
            </h1>
            <p className="text-gray-600 mb-8 text-center">
              Create an account to start writing
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                label="Name"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Input
                type="email"
                label="Email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                type="password"
                label="Password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                loading={loading}
              >
                Create Account
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
