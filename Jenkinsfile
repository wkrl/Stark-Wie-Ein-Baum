def label = "mypod-${UUID.randomUUID().toString()}"
podTemplate(label: label,
        containers: [
                containerTemplate(name: "docker", image: "docker", ttyEnabled: true, command: "cat"),
                containerTemplate(name: "node", image: "node:8-alpine", ttyEnabled: true, command: "cat")
        ],
        volumes: [
                hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
        ]) {
    node(label) {
        def imageName = "registry.datexis.com/ksachs/sweb-frontend"
        def myRepo = checkout scm
        def gitBranch = myRepo.GIT_BRANCH
        def githash = sh(script: "printf \$(git rev-parse --short " + myRepo.GIT_COMMIT + ")", returnStdout: true)
        try {
            stage('Run tests') {
               // container('node') {
               //     sh """
               //         npm install
               //         npm run test:unit
               //     """
               // }
            }
            if (gitBranch.equals("master")) {
                stage("Build and push image") {
                    container('node') {
                        sh """
                            cd app
			                npm install
                            npm run build
                         """
                    }
                    container('docker') {
                        withDockerRegistry([
                                credentialsId: 'registry.datexis.com',
                                url          : 'https://registry.datexis.com']) {
                            sh """
                             docker build -t ${imageName}:${githash} -f app/Dockerfile .
                             docker push ${imageName}:${githash}
                         """
                        }
                    }
                }
                stage('Apply Kubernetes files') {
                    container('docker') {
                        sh """
              apk add curl
              curl -LO https://storage.googleapis.com/kubernetes-release/release/`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt`/bin/linux/amd64/kubectl
              chmod +x ./kubectl
              mv ./kubectl /usr/local/bin/kubectl
              """
                        withKubeConfig([credentialsId: 'sachs-service-account',
                        serverUrl: 'https://datexis-master2.beuth-hochschule.de:6443',
                        clusterName: 'datexis_cluster', 
                        namespace: 'sachs']) {
                            sh """
                            kubectl set image deployments/sweb-frontend sweb-frontend=${imageName}:${githash}
                        """
                        }
                    }
                }
            }
        } finally {
            stage("Collect test results") {
                // testreport
            }
        }
    }
}

