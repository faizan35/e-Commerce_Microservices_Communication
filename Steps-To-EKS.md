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

```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
sudo apt install unzip
unzip awscliv2.zip
sudo ./aws/install -i /usr/local/aws-cli -b /usr/local/bin --update
/usr/local/bin/aws --version
```

##### configure AWS

```bash
aws configure
```

### Step 4: Install Docker

```bash
sudo apt-get update
sudo apt install docker.io
docker ps
sudo chown $USER /var/run/docker.sock
```

### Step 5: Install kubectl

- [Link](https://docs.aws.amazon.com/eks/latest/userguide/install-kubectl.html) for the commands.
- Copy the binary to a folder in your `PATH`, use this [Link]().
  - **Reason** it will work after the reboot as well.

```bash
curl -O https://s3.us-west-2.amazonaws.com/amazon-eks/1.28.5/2024-01-04/bin/linux/amd64/kubectl
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl
kubectl version --client
```



### Step 6: Install eksctl


- [Link](https://docs.aws.amazon.com/emr/latest/EMR-on-EKS-DevelopmentGuide/setting-up-eksctl.html#setting-up-eksctl-linux) for the commands.


```bash
curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
sudo mv /tmp/eksctl /usr/local/bin
eksctl version
```


### Step 7: Setup EKS Cluster

- It will create an EKS cluster named **"e-com-cluster"** in the **us-west-2 region** with a **node group** consisting of EC2 instances of type **t2.medium**. 
- The node group will have a minimum of 2 instances and a maximum of 2 instances.

```bash
eksctl create cluster --name e-com-cluster --region us-west-2 --node-type t2.medium --nodes-min 2 --nodes-max 2
```

- Create kubeconfig file automatically

```bash
aws eks update-kubeconfig --region us-west-2 --name e-com-cluster
kubectl get nodes
```

### Step 8: Apply k8s Manifests files

```bash
git clone https://github.com/faizan35/e-Commerce_Microservices_Communication.git
cd e-Commerce_Microservices_Communication/k8s
```

```bash
bash all-e-com-manifest.sh
```


### Step 9: Install the AWS Load Balancer Controller using Helm

- [Link](https://docs.aws.amazon.com/eks/latest/userguide/lbc-helm.html) for documentaions.

#### 9.1 Create IAM Role using `eksctl`

- **First Command:** Download's the file `iam_policy.json`. 
- **Second Command:** Create an IAM policy using the policy downloaded in the previous step.
- **Third Command:** Create IAM Role using `eksctl`.

> Replace <YOUR_AWS_ACC_NO> with your actual AWS account number.

```bash
curl -O https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.7.1/docs/install/iam_policy.json

aws iam create-policy \
    --policy-name AWSLoadBalancerControllerIAMPolicy \
    --policy-document file://iam_policy.json
```

```bash
eksctl create iamserviceaccount \
  --cluster=e-com-cluster \
  --namespace=kube-system \
  --name=aws-load-balancer-controller \
  --role-name AmazonEKSLoadBalancerControllerRole \
  --attach-policy-arn=arn:aws:iam::<YOUR_AWS_ACC_NO>:policy/AWSLoadBalancerControllerIAMPolicy \
  --approve
``` 


#### 9.2 Install AWS Load Balancer Controller

- Here we will install `aws-load-balancer-controller`, which is Pod that will create Application Load Balancer by reading the `ingress.yml` manifest, or we can say it will apply all the rules mentioned in `ingress.yml` to the ALB.


``` bash
sudo snap install helm --classic
helm repo add eks https://aws.github.io/eks-charts
helm repo update eks

helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
  -n kube-system \
  --set clusterName=e-com-cluster \
  --set serviceAccount.create=false \
  --set serviceAccount.name=aws-load-balancer-controller 
```

#### 9.3 Verify that the controller is installed

- Verify that the controller is installed.

```bash
kubectl get deployment -n kube-system aws-load-balancer-controller
```

## Step 11: Apply Ingerss

``` bash
kubectl apply -f ingress.yaml
```

``` bash
kubectl get ing -n e-com
```

### Cleanup

- To delete the EKS cluster:

``` bash
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
