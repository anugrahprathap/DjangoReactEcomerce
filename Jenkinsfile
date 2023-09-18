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
                cmd  'cd frontend '
                cmd  'npm install && npm run build'
            }
        }

        stage('Build Backend') {
            steps {
                cmd  'cd backend && pip install -r requirements.txt && python manage.py collectstatic --noinput'
            }
        }

      
    }

}
