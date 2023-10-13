# Use the official Node.js 14 base image for the frontend build
FROM node:14 AS frontend-builder

WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend ./
RUN npm run build

# Use the official Python 3.10 base image for the backend
FROM python:3.10 AS backend-builder

WORKDIR /DjangoReactEcomerce
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY backend ./

# Final image to run the application
FROM python:3.10

WORKDIR /DjangoReactEcomerce

# Copy the built frontend from the frontend-builder stage
COPY --from=frontend-builder /DjangoReactEcomerce/frontend/build /app/frontend/build

# Copy the built backend from the backend-builder stage
COPY --from=backend-builder /DjangoReactEcomerce/backend /DjangoReactEcomerce/backend

# Install Gunicorn to serve the Django application
RUN pip install gunicorn

# Expose the necessary ports
EXPOSE 8000

# Command to run the Django application
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]
