
pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }
    stage('Test') {
      steps {
        sh 'npm run test'
      }
    }
    stage('Build Docker Image') {
      steps {
        sh 'docker build -t my-nestjs-app:latest .'
      }
    }
    stage('Push Docker Image') {
      steps {
        withDockerRegistry([ credentialsId: 'docker-hub', url: '' ]) {
          sh 'docker push my-nestjs-app:latest'
        }
      }
    }
    stage('Deploy to Kubernetes') {
      steps {
        kubernetesDeploy(configs: 'docker/kubernetes/*.yaml', kubeconfigId: 'kube-config')
      }
    }
  }
}
  