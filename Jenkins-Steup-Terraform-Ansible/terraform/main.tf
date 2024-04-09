# VPC
module "eks-vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = var.vpc_name
  cidr = var.vpc_cidr

  azs             = data.aws_availability_zones.azs.names
  public_subnets  = var.vpc_subnet
  map_public_ip_on_launch = true
  
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
module "ec2_eks" {
  source  = "terraform-aws-modules/ec2-instance/aws"

  name = "Jenkins-EKS"

  instance_type          = var.ec2-instance_type
  ami                    = var.ec2-ami
  key_name               = var.ec2-key_name
  monitoring             = true
  vpc_security_group_ids = [ module.sg-eks.security_group_id ]
  subnet_id              = module.eks-vpc.public_subnets[0]

  associate_public_ip_address = true
  availability_zone = data.aws_availability_zones.azs.names[0]

  tags = {
    Name        = "EKS-EC2"
    Environment = "dev"
  }
}



