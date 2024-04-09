terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "5.44.0"
    }
  }

  # backend "" {
    
  # }
}

provider "aws" {
  region = "us-west-2"
}