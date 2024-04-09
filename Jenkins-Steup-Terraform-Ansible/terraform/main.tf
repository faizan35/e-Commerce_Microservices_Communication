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
module "sg-eks" {
  source = "terraform-aws-modules/security-group/aws"

  name        = "SG-Jenkins-EKS"
  description = "Security group for Jenkins"
  vpc_id      = module.eks-vpc.vpc_id

  ingress_with_cidr_blocks = [
    {
      from_port   = 8080
      to_port     = 8080
      protocol    = "tcp"
      description = "Jenkins ports"
      cidr_blocks = "0.0.0.0/0"
    },
    {
      from_port   = 80
      to_port     = 80
      protocol    = "tcp"
      description = "HTTP"
      cidr_blocks = "0.0.0.0/0"
    },
    {
      from_port   = 443
      to_port     = 443
      protocol    = "tcp"
      description = "HTTPS"
      cidr_blocks = "0.0.0.0/0"
    },
    {
      from_port   = 22
      to_port     = 22
      protocol    = "tcp"
      description = "SSH"
      cidr_blocks = "0.0.0.0/0"
    },        
  ]
  egress_with_cidr_blocks = [
    {
        from_port   = 0
        to_port     = 0 
        protocol    = "-1"
        description = "Allow all outbound Traffic"
        cidr_blocks = "0.0.0.0/0"
    }
  ]

  tags = {
    Name = "Jenkins-ESK-SG"
  }
}


# EC2



