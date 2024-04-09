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

