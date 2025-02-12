pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                // Clona el repositorio configurado en el job
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                // Instala las dependencias (asegúrate de tener node/yarn instalados en el agente)
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                // Ejecuta el build para crear la versión de producción
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                // Opcional: ejecutar tests
                sh 'npm test'
            }
        }
    }
    post {
        always {
            echo 'Pipeline finalizado.'
        }
    }
}