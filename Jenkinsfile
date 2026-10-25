
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Source code checkout completed'
            }
        }

        stage('Build') {
            steps {
                echo 'Building Order Application'
                sh 'docker --version'
            }
        }

        stage('Test') {
            steps {
                echo 'Testing Order Application'
            }
        }

        stage('Complete') {
            steps {
                echo 'Pipeline completed successfully'
            }
        }
    }
}
