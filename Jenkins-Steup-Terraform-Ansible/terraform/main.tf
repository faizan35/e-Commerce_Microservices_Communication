# VPC
module "eks-vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = var.vpc_name
  cidr = var.vpc_cidr

  azs             = data.aws_availability_zones.azs.names
  public_subnets  = var.vpc_subnet
  
  # enable_dns_hostnames = true

  tags = {
    Name = "Jenkins-EKS-VPC"
  }

  public_subnet_tags = {
    Name = "Jenkins-EKS-Subnet"
  }
}

# SG



# EC2



