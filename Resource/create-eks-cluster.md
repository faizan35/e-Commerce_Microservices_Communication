# Create a Cluster

### Usage: 
```bash
eksctl create cluster [flags]
```

## General Flags:
- **`-n`, `--name`** `string`  
  EKS cluster name (generated if unspecified, e.g., "hilarious-sheepdog-1712571073")
- **`--tags`** `stringToString`  
  Used to tag the AWS resources. List of comma-separated key-value pairs `"k1=v1,k2=v2"` (default `[]`)
- **`-r`, `--region`** `string`  
  AWS region. Defaults to the value set in your AWS config (`~/.aws/config`)
- **`--with-oidc`**  
  Enable the IAM OIDC provider
- **`--zones`** `strings`  
  Specify availability zones (auto-select if unspecified)
- **`--version`** `string`  
  Kubernetes version (valid options: 1.23, 1.24, 1.25, 1.26, 1.27, 1.28, 1.29) (default `1.29`)
- **`-f`, `--config-file`** `string`  
  Load configuration from a file (or stdin if set to `-`)
- **`--timeout`** `duration`  
  Maximum waiting time for any long-running operation (default `25m0s`)
- **`--fargate`**  
  Create a Fargate profile scheduling pods in the default and `kube-system` namespaces onto Fargate
- **`--dry-run`**  
  Dry-run mode that skips cluster creation and outputs a `ClusterConfig`

## Initial Nodegroup Flags:
- **`--nodegroup-name`** `string`  
  Name of the nodegroup (generated if unspecified, e.g., "ng-dd770521")
- **`--without-nodegroup`**  
  If set, the initial nodegroup will not be created
- **`-t`, `--node-type`** `string`  
  Node instance type
- **`-N`, `--nodes`** `int`  
  Total number of nodes (for a static ASG) (default `2`)
- **`-m`, `--nodes-min`** `int`  
  Minimum nodes in ASG (default `2`)
- **`-M`, `--nodes-max`** `int`  
  Maximum nodes in ASG (default `2`)
- **`--node-volume-size`** `int`  
  Node volume size in GB (default `80`)
- **`--node-volume-type`** `string`  
  Node volume type (valid options: `gp2`, `gp3`, `io1`, `sc1`, `st1`) (default `"gp3"`)
- **`--max-pods-per-node`** `int`  
  Maximum number of pods per node (set automatically if unspecified)
- **`--ssh-access`**  
  Control SSH access for nodes. Uses `~/.ssh/id_rsa.pub` as default key path if enabled
- **`--ssh-public-key`** `string`  
  SSH public key to use for nodes (import from local path or use existing EC2 key pair)
- **`--enable-ssm`**  
  Enable AWS Systems Manager (SSM)
- **`--node-ami`** `string`  
  `auto-ssm`, `auto` or an AMI ID (advanced use)
- **`--node-ami-family`** `string`  
  `'AmazonLinux2'` for Amazon EKS optimized AMI, or use `'Ubuntu2204'`, `'Ubuntu2004'`, or `'Ubuntu1804'` for Canonical EKS AMIs (default `"AmazonLinux2"`)
- **`-P`, `--node-private-networking`**  
  Make nodegroup networking private
- **`--node-security-groups`** `strings`  
  Attach additional security groups to nodes
- **`--node-labels`** `stringToString`  
  Extra labels to add when registering the nodes in the nodegroup. List of comma-separated key-value pairs `"k1=v1,k2=v2"` (default `[]`)
- **`--node-zones`** `strings`  
  Inherited from the cluster if unspecified
- **`--instance-prefix`** `string`  
  Add a prefix to the instance name
- **`--instance-name`** `string`  
  Overrides the default instance name
- **`--disable-pod-imds`**  
  Blocks IMDS requests from non-host networking pods
- **`--managed`**  
  Create EKS-managed nodegroup (default `true`)
- **`--spot`**  
  Create a spot nodegroup (managed nodegroups only)
- **`--instance-types`** `strings`  
  Comma-separated list of instance types (e.g., `--instance-types=c3.large,c4.large,c5.large`)

## Cluster and Nodegroup Add-ons Flags:
- **`--asg-access`**  
  Enable IAM policy for cluster-autoscaler
- **`--external-dns-access`**  
  Enable IAM policy for external-dns
- **`--full-ecr-access`**  
  Enable full access to ECR
- **`--appmesh-access`**  
  Enable full access to AppMesh
- **`--appmesh-preview-access`**  
  Enable full access to AppMesh Preview
- **`--alb-ingress-access`**  
  Enable full access for ALB ingress controller
- **`--install-neuron-plugin`**  
  Install Neuron plugin for Inferentia and Trainium nodes (default `true`)
- **`--install-nvidia-plugin`**  
  Install Nvidia plugin for GPU nodes (default `true`)

## VPC Networking Flags:
- **`--vpc-cidr`** `ipNet`  
  Global CIDR to use for VPC (default `192.168.0.0/16`)
- **`--vpc-private-subnets`** `strings`  
  Re-use private subnets of an existing VPC
- **`--vpc-public-subnets`** `strings`  
  Re-use public subnets of an existing VPC
- **`--vpc-from-kops-cluster`** `string`  
  Re-use VPC from a given kops cluster
- **`--vpc-nat-mode`** `string`  
  VPC NAT mode, valid options: `HighlyAvailable`, `Single`, `Disable` (default `"Single"`)

## Instance Selector Options Flags:
- **`--instance-selector-vcpus`** `int`  
  An integer value (e.g., `2`, `4`)
- **`--instance-selector-memory`** `string`  
  Memory value (e.g., `4`, `4GiB`)
- **`--instance-selector-cpu-architecture`** `string`  
  `x86_64` or `arm64`
- **`--instance-selector-gpus`** `int`  
  Number of GPUs

## AWS Client Flags:
- **`-p`, `--profile`** `string`  
  AWS credentials profile to use (defaults to `AWS_PROFILE` environment variable)
- **`--cfn-role-arn`** `string`  
  IAM role used by CloudFormation to call AWS API on your behalf
- **`--cfn-disable-rollback`**  
  Prevent stack rollback on failure (use cautiously)

## Output Kubeconfig Flags:
- **`--kubeconfig`** `string`  
  Path to write kubeconfig (default `/home/ubuntu/.kube/config`)
- **`--authenticator-role-arn`** `string`  
  AWS IAM role to assume for authenticator
- **`--set-kubeconfig-context`**  
  Set the current context in kubeconfig (default `true`)
- **`--auto-kubeconfig`**  
  Save kubeconfig file by cluster name
- **`--write-kubeconfig`**  
  Toggle writing of kubeconfig (default `true`)

## Common Flags:
- **`-C`, `--color`** `string`  
  Toggle colorized logs (`true`, `false`, `fabulous`) (default `true`)
- **`-d`, `--dumpLogs`**  
  Dump logs to disk on failure
- **`-h`, `--help`**  
  Display help for this command
- **`-v`, `--verbose`** `int`  
  Set log level (0 = silent, 4 = debug, 5 = AWS debug) (default `3`)

For detailed docs, visit [eksctl.io](https://eksctl.io/).
