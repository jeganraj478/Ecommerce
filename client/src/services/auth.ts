
import { AxiosConfig } from '../config/AxiosConfig';
import { IUserLogin, IUserRegistration, ILoginResponse } from '../types/userTypes';

export const login = async (credentials: IUserLogin) => {
    const response = await AxiosConfig.post<ILoginResponse>('/login', credentials);
    // Store token in localStorage
    localStorage.setItem('token', response.data.token);
    return response.data;
}

export const register = async (userData: IUserRegistration) => {
    const response = await AxiosConfig.post('/register', userData);
    return response.data;
}

export const logout = () => {
    localStorage.removeItem('token');
    return null;
}


