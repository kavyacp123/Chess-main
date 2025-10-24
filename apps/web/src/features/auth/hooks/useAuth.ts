import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userAtom } from '@repo/store/userAtom';
import { AuthService } from '../services/auth.service';
import { User, LoginRequest } from '../types/auth.types';

export const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, [setUser]);

  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await AuthService.loginWithGoogle();
    } catch (err) {
      setError('Failed to login with Google');
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGithub = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await AuthService.loginWithGithub();
    } catch (err) {
      setError('Failed to login with Github');
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsGuest = async (request: LoginRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await AuthService.loginAsGuest(request);
      setUser(response.user);
      AuthService.setCurrentUser(response.user);
      navigate('/game/random');
    } catch (err) {
      setError('Failed to login as guest');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await AuthService.logout();
      setUser(null);
      navigate('/login');
    } catch (err) {
      setError('Failed to logout');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    error,
    loginWithGoogle,
    loginWithGithub,
    loginAsGuest,
    logout,
    isAuthenticated: !!user,
  };
};
