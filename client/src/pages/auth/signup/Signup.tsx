import React, { useState } from 'react';
import { register } from '../../../services/auth';

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: string;
  section?: string;
  major?: string;
  year?: string;
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
    section: '',
    major: '',
    year: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.username) newErrors.username = 'Username is required.';
    if (!formData.email) newErrors.email = 'Email is required.';
    if (!formData.password) newErrors.password = 'Password is required.';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match.';
    if (!formData.userType) newErrors.userType = 'User type is required.';
    if (formData.userType === 'student') {
      if (!formData.section) newErrors.section = 'Section is required.';
      if (!formData.major) newErrors.major = 'Major is required.';
      if (!formData.year) newErrors.year = 'Year is required.';
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      await register(formData);
      alert('Registration successful!');
    } catch (error) {
      console.log(error);
      alert('Registration failed!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Create Account</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <input
              type='text'
              name='username'
              value={formData.username}
              onChange={handleChange}
              placeholder='Username'
              className={`w-full p-2 border rounded-full ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.username && (
              <p className='text-red-500 text-sm mt-1'>{errors.username}</p>
            )}
          </div>
          <div>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Email'
              className={`w-full p-2 border rounded-full ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
            )}
          </div>
          <div>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Password'
              className={`w-full p-2 border rounded-full ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.password && (
              <p className='text-red-500 text-sm mt-1'>{errors.password}</p>
            )}
          </div>
          <div>
            <input
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder='Confirm Password'
              className={`w-full p-2 border rounded-full ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.confirmPassword && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <div>
            <select
              name='userType'
              value={formData.userType}
              onChange={handleChange}
              className={`w-full p-2 border rounded-full ${
                errors.userType ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value=''>Select user type</option>
              <option value='student'>Student</option>
              <option value='other'>Other</option>
            </select>
            {errors.userType && (
              <p className='text-red-500 text-sm mt-1'>{errors.userType}</p>
            )}
          </div>
          {formData.userType === 'student' && (
            <>
              <div>
                <select
                  name='section'
                  value={formData.section}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-full ${
                    errors.section ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value=''>Select section</option>
                  <option value='A'>Section A</option>
                  <option value='B'>Section B</option>
                  <option value='C'>Section C</option>
                </select>
                {errors.section && (
                  <p className='text-red-500 text-sm mt-1'>{errors.section}</p>
                )}
              </div>
              <div>
                <select
                  name='major'
                  value={formData.major}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-full ${
                    errors.major ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value=''>Select major</option>
                  <option value='Computer Sci'>Computer Science</option>
                  <option value='Computer Tech'>Computer Technology</option>
                </select>
                {errors.major && (
                  <p className='text-red-500 text-sm mt-1'>{errors.major}</p>
                )}
              </div>
              <div>
                <select
                  name='year'
                  value={formData.year}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-full ${
                    errors.year ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value=''>Select year</option>
                  <option value='1'>First Year</option>
                  <option value='2'>Second Year</option>
                  <option value='3'>Third Year</option>
                  <option value='4'>Fourth Year</option>
                  <option value='5'>Fifth Year</option>
                </select>
                {errors.year && (
                  <p className='text-red-500 text-sm mt-1'>{errors.year}</p>
                )}
              </div>
            </>
          )}
          <button
            type='submit'
            className='w-full flex justify-center bg-yellow-400 text-black p-2 rounded-full hover:bg-yellow-500 transition-colors'
          >
            {isSubmitting ? 'Submitting...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
