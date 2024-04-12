# Setting up Jenkins server - with Terraform


### 1. Install Terraform

- Bring up an Ubuntu vm on your local or an EC2 instace.

```bash
sudo apt-get update && sudo apt-get install -y gnupg software-properties-common

wget -O- https://apt.releases.hashicorp.com/gpg | \
gpg --dearmor | \
sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg > /dev/null

gpg --no-default-keyring \
--keyring /usr/share/keyrings/hashicorp-archive-keyring.gpg \
--fingerprint

echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
https://apt.releases.hashicorp.com $(lsb_release -cs) main" | \
sudo tee /etc/apt/sources.list.d/hashicorp.list

sudo apt update
sudo apt-get install -y terraform
```

### 2. Install AWS CLI & Configure

```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
sudo apt install unzip
unzip awscliv2.zip
sudo ./aws/install -i /usr/local/aws-cli -b /usr/local/bin --update
/usr/local/bin/aws --version
```

#### Configure AWS

- Create a **IAM User** with `AdministratorAccess`.
- Generate Security Credentials: **Access Key** and **Secret Access Key**.
- Configure your EC2 with keys created.

```bash
aws configure
```


### 3. Key-Pair Setup 

#### Create your Key-Pair in your AWS account

- We will need public key name for SSH (eg., `eks`).

#### Change in `terraform.tfvars`

- Change the name of your public key name in the field `ec2-key_name` in `terraform.tfvars`.


### 4. Clone Repo

```bash
git clone https://github.com/faizan35/e-Commerce_Microservices_Communication.git
cd e-Commerce_Microservices_Communication/Jenkins-Steup-Terraform-Ansible/terraform
```

### 5. Initialize the the AWS provider

```bash
terraform init
```


### 6. Apply changes

```bash
terraform apply -auto-approve 
```

> The `tools-installations.sh` script will take few minutes to provision.

### 7. Access the Jenkins server

- After few min you can access the jenkins server on public IP address with port 8080.
- You can get the public IP from the terraform output or AWS console.

```bash
http://<Public_IP>:8080
```

##### Congratulations! You have successfully created a Jenkins Server with Terraform without touching the AWS Console.