# STEPS


```bash
git clone https://github.com/faizan35/e-Commerce_Microservices_Communication.git
```

## K8s

- Namespace: `kubectl create namespace e-com`


## add policy

- `arn:aws:iam::325954021681:root`: EKS Access



### Step 1: IAM Configuration
- Create a user `eks-admin` with `AdministratorAccess`.
- Generate Security Credentials: Access Key and Secret Access Key.

### Step 2: EC2 Setup
- Launch an Ubuntu instance in your favourite region (eg. region `us-west-2`).
- SSH into the instance from your local machine.

### Step 3: Install AWS CLI v2

``` shell
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
sudo apt install unzip
unzip awscliv2.zip
sudo ./aws/install -i /usr/local/aws-cli -b /usr/local/bin --update
/usr/local/bin/aws --version
```

##### configure AWS

``` shell
aws configure
```

### Step 4: Install Docker
``` shell
sudo apt-get update
sudo apt install docker.io
docker ps
sudo chown $USER /var/run/docker.sock
```

### Step 5: Install kubectl
``` shell
curl -o kubectl https://amazon-eks.s3.us-west-2.amazonaws.com/1.19.6/2021-01-05/bin/linux/amd64/kubectl
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin
kubectl version --short --client
```

### Step 6: Install eksctl
``` shell
curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
sudo mv /tmp/eksctl /usr/local/bin
eksctl version
```

### Step 7: Setup EKS Cluster

``` shell
eksctl create cluster --name e-com-cluster --region us-west-2 --node-type t2.medium --nodes-min 2 --nodes-max 2
```

``` shell
aws eks update-kubeconfig --region us-west-2 --name e-com-cluster
kubectl get nodes
```

### Step 8: Run Manifests with Script

```bash
git clone https://github.com/faizan35/e-Commerce_Microservices_Communication.git
cd e-Commerce_Microservices_Communication/k8s
```

``` shell
bash all-e-com-manifest.sh
```

### Step 9: Install AWS Load Balancer

``` shell
curl -O https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.5.4/docs/install/iam_policy.json
aws iam create-policy --policy-name AWSLoadBalancerControllerIAMPolicy --policy-document file://iam_policy.json
eksctl utils associate-iam-oidc-provider --region=us-west-2 --cluster=e-com-cluster --approve
```

```bash
eksctl create iamserviceaccount --cluster=e-com-cluster --namespace=kube-system --name=aws-load-balancer-controller --role-name AmazonEKSLoadBalancerControllerRole --attach-policy-arn=arn:aws:iam::325954021681:policy/AWSLoadBalancerControllerIAMPolicy --approve --region=us-west-2
```


### Step 10: Deploy AWS Load Balancer Controller

``` shell
sudo snap install helm --classic
helm repo add eks https://aws.github.io/eks-charts
helm repo update eks
helm install aws-load-balancer-controller eks/aws-load-balancer-controller -n kube-system --set clusterName=e-com-cluster --set serviceAccount.create=false --set serviceAccount.name=aws-load-balancer-controller
kubectl get deployment -n kube-system aws-load-balancer-controller
```

## Step 11: Apply Ingerss

``` shell
kubectl apply -f ingress.yaml
```

``` shell
kubectl get ing -n three-tier
```

### Cleanup

- To delete the EKS cluster:

``` shell
eksctl delete cluster --name e-com-cluster --region us-west-2
```

## Contribution Guidelines
- Fork the repository and create your feature branch.
- Deploy the application, adding your creative enhancements.
- Ensure your code adheres to the project's style and contribution guidelines.
- Submit a Pull Request with a detailed description of your changes.

## Rewards
- Successful PR merges will be eligible for exciting prizes!

## Support
For any queries or issues, please open an issue in the repository.

---
Happy Learning! 🚀👨‍💻👩‍💻
