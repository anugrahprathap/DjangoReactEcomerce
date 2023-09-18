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
                dir('backend'){
                    bat  'python.exe -m pip install -r requirements.txt && python.exe manage.py collectstatic --noinput'
                }
                
            }
        }

      
    }

}
