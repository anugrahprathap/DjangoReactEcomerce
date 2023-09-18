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
                    bat 'npm cache clean'
                    bat 'npm install'
                    powershell 'npm run build'
                }
            }
        }
        stage('Build Backend') {
            steps {
                dir('backend'){
                    bat  'python -m pip install -r requirements.txt'
                    bat 'python manage.py collectstatic --noinput'
                }
                
            }
        }

      
    }

}
