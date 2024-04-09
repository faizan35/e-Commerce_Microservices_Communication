output "ec2-pub-ip" {
    value = module.ec2_eks.public_ip
}



output "Public DNS" {
    value = module.ec2_eks.public_dns
}


