pipeline {
    agent any
    tools {
        // Specify the Python tool installation name
        python name: 'Python3'
    }

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
                dir('backend'){
                    bat  'python -m pip install -r requirements.txt && python manage.py collectstatic --noinput'
                }
                
            }
        }

      
    }

}
