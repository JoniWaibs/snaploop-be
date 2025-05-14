
# 🎉 Álbumes Compartidos con Clasificación de Rostros

## Descripción

Esta es una **aplicación web progresiva (PWA)** diseñada para que grupos de amigos puedan **subir, compartir y clasificar fotos automáticamente** utilizando reconocimiento facial (AWS Rekognition). Los usuarios pueden organizar fotos de eventos compartidos y descargarlas de manera personalizada.

---

## 🛠️ Tecnologías Usadas

- **Frontend**: [Next.js 15](https://nextjs.org/) + PWA, alojado en Vercel
- **Backend**: [Fastify](https://www.fastify.io/) + [TypeScript](https://www.typescriptlang.org/)
- **Base de Datos**: [PostgreSQL](https://www.postgresql.org/) con [Prisma ORM](https://www.prisma.io/)
- **Autenticación**: Google OAuth + JWT
- **Almacenamiento de Imágenes**: [AWS S3](https://aws.amazon.com/s3/)
- **Reconocimiento Facial**: [AWS Rekognition](https://aws.amazon.com/rekognition/)
- **Pasarelas de Pago**:
  - Mercado Pago (Argentina)
  - PayPal (Internacional)
- **Internacionalización**: [next-i18next](https://github.com/isaachinman/next-i18next)

---

## 🚀 Características Principales

1. **Registro e Inicio de Sesión**:
   - Inicia sesión con Google, genera un token JWT para autenticación.
   
2. **Creación de Álbum**:
   - Crea álbumes con un ID único y un link de invitación.

3. **Invitación**:
   - Comparte álbumes mediante un enlace (WhatsApp, Telegram, etc.).
   
4. **Subida de Fotos**:
   - Los usuarios pueden subir fotos a un álbum. Las imágenes se almacenan en AWS S3.

5. **Clasificación Automática de Rostros**:
   - AWS Rekognition clasifica y agrupa fotos por rostro, facilitando la visualización de fotos personales, grupales y paisajes.

6. **Exploración y Filtrado**:
   - Los usuarios pueden filtrar fotos por categorías: personales, grupales, paisajes.

7. **Descarga Personalizada**:
   - Los usuarios pueden descargar fotos en las que aparecen o todo el álbum.

---

## 💰 Monetización

- **Plan Gratuito**:
  - 1 álbum por usuario.
  - Hasta 15 miembros por álbum.
  - Procesamiento de fotos incluido (AWS Rekognition + S3).

- **Plan Pago**:
  - Desde el **segundo álbum** o **más de 15 miembros**: **$10 USD por álbum**.
  - Desbloquea procesamiento ilimitado y sin restricciones de miembros.

---

## 🌍 Internacionalización

- Soporte para **Español** e **Inglés**.
- Detecta el idioma del navegador o permite elegir entre idiomas disponibles.

---

## 📦 Instalación

1. Clona el repositorio:
   ```bash
   git clone <repo-url>
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno (`.env`):
   - Google OAuth credentials.
   - AWS credentials (S3, Rekognition).
   - Base de datos y otras configuraciones.

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

---

## 📝 Contribuciones

Si deseas contribuir al proyecto, por favor realiza un **fork** y envía tus **pull requests**.

---

## 📬 Contacto

- Para más información, preguntas o sugerencias, puedes contactar al equipo de desarrollo a través de [correo de contacto].
