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
                    powershell 'npm cache clean'
                    powershell 'npm install'
                    powershell 'npm run build'
                }
            }
        }
        stage('Build Backend') {
            steps {
                dir('backend'){
                    powershell  'python -m pip install -r requirements.txt'
                    powershell 'python manage.py collectstatic --noinput'
                }
                
            }
        }

      
    }

}
