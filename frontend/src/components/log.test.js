// Importar las dependencias necesarias para las pruebas
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axiosMock from 'axios'; // Usar axios-mock-adapter o jest.mock para simular respuestas
import Login from './login'; // Asumiendo que tu componente se llama Login y está exportado adecuadamente

// Mock del módulo axios
jest.mock('axios');

describe('Login Component', () => {
    it('allows the user to log in when credentials are correct', async () => {
        // Renderiza el componente en el entorno de prueba
        const { getByLabelText, getByText } = render(<Login />);

        // Simula la respuesta de axios
        axiosMock.post.mockResolvedValueOnce({
            status: 200,
            data: { user: 'someUser' }
        });

        // Llena los campos del formulario
        fireEvent.change(getByLabelText('Usuario'), { target: { value: 'testuser' } });
        fireEvent.change(getByLabelText('Contraseña'), { target: { value: 'password' } });

        // Hace clic en el botón de login
        fireEvent.click(getByText('Iniciar Sesión'));

        // Espera a que el botón de Iniciar Sesión sea llamado
        await waitFor(() => {
            expect(axiosMock.post).toHaveBeenCalledWith('http://localhost:5000/login', {
                usuario: 'testuser',
                contraseña: 'password',
            });
        });

        // Verifica si se muestra la alerta de éxito
        expect(getByText('Iniciando Sesión...')).toBeInTheDocument();
    });

    it('shows an error when the login credentials are incorrect', async () => {
        // Renderiza el componente en el entorno de prueba
        const { getByLabelText, getByText } = render(<Login />);

        // Simula un error de axios
        axiosMock.post.mockRejectedValueOnce(new Error('Credenciales incorrectas'));

        // Llena los campos del formulario
        fireEvent.change(getByLabelText('Usuario'), { target: { value: 'wronguser' } });
        fireEvent.change(getByLabelText('Contraseña'), { target: { value: 'wrongpassword' } });

        // Hace clic en el botón de login
        fireEvent.click(getByText('Iniciar Sesión'));

        // Espera a que se muestre el error
        await waitFor(() => {
            expect(getByText('Credenciales incorrectas. Por favor, inténtelo de nuevo.')).toBeInTheDocument();
        });
    });
});
