pipeline {
    agent any
    environment {
        python = "C:/Users/Anugrah/AppData/Local/Microsoft/WindowsApps/python3.10.exe"
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
                    bat 'npm install --save-dev @babel/plugin-proposal-private-property-in-object
'
                    
                    bat 'npm install'
                    bat 'npm run build'
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
