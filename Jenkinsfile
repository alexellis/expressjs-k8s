pipeline {
	agent none
	options {
		skipDefaultCheckout(true)
	}
	environment{
		COMPONENT_NAME='expressjs'
		HELM_DEV_REPOSITORY="helm-local"
		DOCKER_DEV_REPOSITORY="docker-local"
		DOCKER_DEV_REGISTRY="angelnunez-${DOCKER_DEV_REPOSITORY}.jfrog.io"
		DOCKER_DEV_IMAGE="${DOCKER_DEV_REGISTRY}/${COMPONENT_NAME}"
		DOCKER_INTEGRACION_REPOSITORY="docker-integracion-local"
		DOCKER_INTEGRACION_REGISTRY="angelnunez-${DOCKER_INTEGRACION_REPOSITORY}.jfrog.io"
		
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
									sh "docker login ${DOCKER_DEV_REGISTRY} --username='${USERNAME}' --password='${PASSWORD}'"
									sh "docker build -t ${DOCKER_DEV_IMAGE}:${chart.version} ."
									sh "docker push ${DOCKER_DEV_IMAGE}:${chart.version}"
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
									sh "curl -u ${USERNAME}:${PASSWORD} -T ${COMPONENT_NAME}-${chart.version}.tgz 'https://angelnunez.jfrog.io/artifactory/${HELM_DEV_REPOSITORY}/${COMPONENT_NAME}-${chart.version}.tgz'"
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
						container('curl') {
							script{
								withCredentials([usernamePassword(credentialsId: 'artifactorycloud', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
									unstash 'Chart.yaml'
									def chart = readYaml file: "chart/${COMPONENT_NAME}/Chart.yaml"
									sh "curl -i -u ${USERNAME}:${PASSWORD} -X POST 'https://angelnunez.jfrog.io/artifactory/api/docker/${DOCKER_DEV_REPOSITORY}/v2/promote' -H 'Content-Type: application/json' -d '{\"targetRepo\":\"${DOCKER_INTEGRACION_REPOSITORY}\",\"dockerRepository\":\"${COMPONENT_NAME}\",\"tag\":\"${chart.version}\"}'"
								}
							}
						}
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
									sh "helm pull artifactory/${COMPONENT_NAME} --version ${chart.version} --untar"
									sh "helm upgrade --install ${COMPONENT_NAME} ./${COMPONENT_NAME} -f ./${COMPONENT_NAME}/env/values-integracion.yml"
								}
							}					
						}
					}
				}
			}
		}
	}
}