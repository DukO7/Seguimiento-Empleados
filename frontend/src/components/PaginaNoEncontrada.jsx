import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import videoNo from './media/error1.mp4'; // Asegúrate de importar el video aquí

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{
            position: 'relative',
            textAlign: 'center',
            height: '100vh', // Ajusta esto según tus necesidades
            overflow: 'hidden'
        }}>
            <video autoPlay muted loop style={{
                position: 'absolute',
                width: '100%',
                left: '50%',
                top: '50%',
                height: '100%',
                objectFit: 'cover',
                transform: 'translate(-50%, -50%)',
                zIndex: '-1'
            }}>
                <source src={videoNo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <Typography variant="h4" gutterBottom sx={{ pt: 8 }}>
                Página no encontrada
            </Typography>
            <Typography variant="subtitle1">
                Lo sentimos, la página que buscas no existe.
            </Typography>
            <Button
                variant="contained"
                sx={{ mt: 3 }}
                onClick={() => navigate('/')}
            >
                Volver al inicio
            </Button>
        </Box>
    );
};

export default NotFoundPage;
