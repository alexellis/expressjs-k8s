pipeline {
	agent any
	options {
		skipDefaultCheckout(true)
	}
	environment{
		COMPONENT_NAME='expressjs'
	}
	stages {
		stage('Descargar Fuentes') {
			steps {
				checkout scm
			}
		}
		stage('Compilar y Publicar Docker') {
			steps {
				container('docker') {
					script {
						def chart = readYaml file: "chart/${COMPONENT_NAME}/Chart.yaml"
						env.REPOSITORY_URI="angelnunez-docker-local.jfrog.io/${COMPONENT_NAME}"
						withCredentials([usernamePassword(credentialsId: 'artifactorycloud', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
							 sh "docker login angelnunez-docker-local.jfrog.io --username='${USERNAME}' --password='${PASSWORD}'"
							 sh "docker build -t ${REPOSITORY_URI}:${chart.version} ."
							 sh "docker push ${REPOSITORY_URI}:${chart.version}"
						}
					}
				}
			}
		}
		stage('Publicar Helm') {
			steps {
				container('helm') {
					sh "helm package chart/${COMPONENT_NAME}"
				}
				container('curl') {
					script {
						withCredentials([usernamePassword(credentialsId: 'artifactorycloud', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
							def chart = readYaml file: "chart/${COMPONENT_NAME}/Chart.yaml"
							sh "curl -u ${USERNAME}:${PASSWORD} -T ${COMPONENT_NAME}-${chart.version}.tgz 'https://angelnunez.jfrog.io/artifactory/helm-local/${COMPONENT_NAME}'"
						}
					}					
				}				
			}
		}
		// stage('Desplegar a Integracion') {
		// 	agent any
		// 	steps {
		// 		sh 'helm upgrade --install expressjs ./chart/expressjs'
		// 	}
		// }
		// stage('Promocionar a Calidad') {
		// 	when {
		// 		expression {
		// 			timeout(time: 3, unit: 'DAYS') {
		// 				input message: 'Promocionar a Calidad?'
		// 				return true
		// 			}
		// 		}
		// 		beforeAgent true
		// 	}
		// 	agent any
		// 	steps {
		// 		echo 'Promocionando'
		// 	}
		// }
		// stage('Desplegar a Calidad') {
		// 	agent any
		// 	steps {
		// 		sh 'helm upgrade --install expressjs --namespace calidad -f ./chart/expressjs/values-calidad.yaml ./chart/expressjs'
		// 	}
		// }
	}
}