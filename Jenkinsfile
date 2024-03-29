pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
    }

    tools {
        nodejs 'node'
    }

    environment {
        DATE = new Date().format('yy.M')
        TAG = "${DATE}.${BUILD_NUMBER}"
        SONAR_TOKEN = credentials('SONAR_TOKEN')
    }

    stages {
        stage('Clean workspace') {
            steps {
                cleanWs()
                checkout scm
                echo "Building ${env.BRANCH_NAME}..."
            }
        }
        stage('Building Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Sonar Scan') {
            steps {
                sh "sonar-scanner -Dsonar.branch.name=${env.BRANCH_NAME}"
            }
        }
        stage('Building Application') {
            steps {
                sh 'npm run build'
                script {
                    if (env.BRANCH_NAME == 'main') {
                        archiveArtifacts artifacts: 'dist/cash-overflow/**', fingerprint: true
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}