variable "vpc_name" {
  description = "Name for VPC"
  type = string
}

variable "vpc_cidr" {
  description = "CIDR for VPC"
  type = string
}

variable "vpc_subnet" {
  description = "Subnet for VPC"
  type = list(string)
}

variable "ec2-instance_type" {
  description = "Type of Instance in EC2"
  type = string
}

variable "ec2-ami" {
  description = "AMI for EC2"
  type = string
}

variable "ec2-key_name" {
  description = "Public Key Name for EC2"
  type = string
}

