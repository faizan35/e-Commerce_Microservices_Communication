#!/bin/bash

# Function to apply manifest files in a directory
apply_manifests() {
    local dir=$1
    echo "Applying manifest files in directory: $dir"
    kubectl apply -f "$dir"
}


# Create namespace e-com if it doesn't exist
if ! kubectl get namespace e-com &> /dev/null; then
    echo "."
    kubectl create namespace e-com
    echo "."
fi

sleep 1

# Main script
echo "Starting manifest application process..."

echo "."

# Apply manifest files in Database directory
apply_manifests "database"

# Wait for 5 seconds before proceeding to the next directory
echo "."
sleep 5

# Apply manifest files in Backend directory
apply_manifests "backend"

# Wait for 5 seconds before proceeding to the next directory
echo "."
sleep 5

# Apply manifest files in Frontend directory
apply_manifests "frontend"

echo "."

echo "Manifest application process completed."

echo "----------------------------------------------------"

echo "Waiting 25 Seconds"
sleep 25

# Get pods in namespace e-com
echo "kubectl get pods -n e-com"
kubectl get pods -n e-com

echo "----------------------------------------------------"

# Get svc in namespace e-com
echo "kubectl get svc -n e-com"
kubectl get svc -n e-com