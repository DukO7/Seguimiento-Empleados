# Seguimiento de Empleados
Este proyecto está diseñado para gestionar y seguir el desempeño de los empleados dentro de una organización. Incluye funcionalidades para añadir, editar, y visualizar empleados y sus respectivos datos.

Prerrequisitos
Antes de instalar y ejecutar el proyecto, asegúrate de tener instalado:

Node.js
npm
Un sistema de gestión de bases de datos SQL (Recomendado: MySQL a través de XAMPP para simplificar la configuración de phpMyAdmin)
Instalación
Clonar el repositorio
Para obtener el proyecto, clona el repositorio usando git:

bash
Copiar código
git clone https://github.com/DukO7/Seguimiento-Empleados.git
cd Seguimiento-Empleados
Configuración de la base de datos
Antes de iniciar el servidor, debes configurar la base de datos:

Importar la base de datos:

Navega a la carpeta bd dentro del repositorio clonado.
Encuentra el archivo SQL y utilízalo para importar la estructura y los datos iniciales a través de phpMyAdmin o cualquier interfaz de gestión de MySQL.
Configuración alternativa mediante SQL:

Si prefieres, puedes utilizar los comandos SQL proporcionados en otro archivo dentro de la misma carpeta para configurar tu base de datos manualmente.
Instalación de dependencias
Backend
bash
Copiar código
cd backend
npm install
Levantar el servidor
Para iniciar el servidor, ejecuta:

bash
Copiar código
node server.js
Deberías ver los mensajes "Servidor corriendo en el puerto 5000" y "Conectado a MySQL" indicando que todo está funcionando correctamente.

Credenciales predeterminadas
Las credenciales de administrador predeterminadas para acceder al sistema son:

Usuario: adad137
Contraseña: adad137
Frontend
Para instalar y ejecutar el frontend del proyecto:

bash
Copiar código
cd frontend
npm install
npm start
Esto debería abrir automáticamente una ventana en tu navegador predeterminado con la aplicación funcionando.

Uso
Una vez instalado y ejecutado, la aplicación permitirá gestionar empleados, editar sus datos, y consultar diversas informaciones relacionadas con su desempeño y datos personales.