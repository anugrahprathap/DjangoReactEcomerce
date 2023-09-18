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
                dir('frontend'){
                    bat 'npm install'
                    bat 'npm run build'
                }
    
                
            }
        }

        stage('Build Backend') {
            steps {
                bat  'cd backend && pip install -r requirements.txt && python manage.py collectstatic --noinput'
            }
        }

      
    }

}
