pipeline {
	agent none
	options {
		skipDefaultCheckout(true)
	}
	environment{
		COMPONENT_NAME='expressjs'
		DOCKER_REGISTRY="angelnunez-docker-local.jfrog.io"
		DOCKER_IMAGE="${DOCKER_REGISTRY}/${COMPONENT_NAME}"
	}
	stages {
		stage('Build Stages'){
			agent any
			stages{
				stage('Checkout Code') {
					steps {
						checkout scm
						stash includes: "chart/${COMPONENT_NAME}/Chart.yaml", name: 'Chart.yaml'
					}
				}
				stage('Generate and Publish Docker Image') {
					steps {
						container('docker') {
							script {
								def chart = readYaml file: "chart/${COMPONENT_NAME}/Chart.yaml"
								withCredentials([usernamePassword(credentialsId: 'artifactorycloud', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
									sh "docker login ${DOCKER_REGISTRY} --username='${USERNAME}' --password='${PASSWORD}'"
									sh "docker build -t ${DOCKER_IMAGE}:${chart.version} ."
									sh "docker push ${DOCKER_IMAGE}:${chart.version}"
								}
							}
						}
					}
				}
				stage('Generate and Publish Helm Chart') {
					steps {
						container('helm') {
							sh "helm package chart/${COMPONENT_NAME}"
						}
						container('curl') {
							script {
								withCredentials([usernamePassword(credentialsId: 'artifactorycloud', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
									def chart = readYaml file: "chart/${COMPONENT_NAME}/Chart.yaml"
									sh "curl -u ${USERNAME}:${PASSWORD} -T ${COMPONENT_NAME}-${chart.version}.tgz 'https://angelnunez.jfrog.io/artifactory/helm-local/${COMPONENT_NAME}-${chart.version}.tgz'"
								}
							}					
						}				
					}
				}
			}
		}
		stage('Integration Stages'){
			when {
				expression {
					timeout(time: 3, unit: 'DAYS') {
						input message: 'Promocionar a Integración?'
						return true
					}
				}
				beforeAgent true
			}
			agent any
			stages{
				stage('Promocionar a Integración') {
					steps {
						echo 'Promocionando'
					}
				}
				stage('Desplegar a Integracion') {
					steps {
						container('helm') {
							script {
								withCredentials([usernamePassword(credentialsId: 'artifactorycloud', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {									
									unstash 'Chart.yaml'
									def chart = readYaml file: "chart/${COMPONENT_NAME}/Chart.yaml"
									sh "helm repo add artifactory https://angelnunez.jfrog.io/artifactory/helm --username ${USERNAME} --password ${PASSWORD}"
									sh "helm install ${COMPONENT_NAME} artifactory/${COMPONENT_NAME} --version ${chart.version}"
								}
							}					
						}
					}
				}
			}
		}
	}
}