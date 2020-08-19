pipeline {
	agent any
	options {
		skipDefaultCheckout(true)
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
						def chart = readYaml file: 'chart/expressjs/Chart.yaml'
						//sh "docker build -t snahider/expressjs:${chart.version} ."
						env.REPOSITORY_URI="angelnunez-docker.jfrog.io/pet-clinic"
						withCredentials([usernamePassword(credentialsId: 'artifactorycloud', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
							 sh "docker login --username='${USERNAME}' --password='${PASSWORD}'"
							 sh "docker build -t ${REPOSITORY_URI}:${chart.version} ."
							 sh "docker push ${REPOSITORY_URI}:${chart.version}"
						}
						//docker tag <IMAGE_ID> angelnunez-docker.jfrog.io/<DOCKER_REPOSITORY>:<DOCKER_TAG>
					}
				}
			}
		}
		stage('Publicar Helm') {
			steps {
				echo 'Publicar helm'
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