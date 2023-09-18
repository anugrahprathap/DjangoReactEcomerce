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
                    bat  'C:/Users/Anugrah/AppData/Local/Microsoft/WindowsApps/python3.10.exe -m pip install -r requirements.txt && C:/Users/Anugrah/AppData/Local/Microsoft/WindowsApps/python3.10.exe manage.py collectstatic --noinput'
                }
                
            }
        }

      
    }

}
