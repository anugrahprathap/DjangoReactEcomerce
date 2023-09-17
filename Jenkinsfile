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
                sh 'cd frontend/frontend && npm install && npm run build'
            }
        }

        stage('Build Backend') {
            steps {
                sh 'cd backend && pip install -r requirements.txt && python manage.py collectstatic --noinput'
            }
        }

      
    }

}
