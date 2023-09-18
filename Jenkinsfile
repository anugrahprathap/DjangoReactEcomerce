pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Frontend') {
            steps {
                bat  'cd frontend '
                bat 'npm install && npm run build'
            }
        }

        stage('Build Backend') {
            steps {
                bat  'cd backend && pip install -r requirements.txt && python manage.py collectstatic --noinput'
            }
        }

      
    }

}
