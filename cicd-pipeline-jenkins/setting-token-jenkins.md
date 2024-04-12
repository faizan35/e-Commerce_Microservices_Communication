# Step's to set Service Account token for Jenkins

### 1. Create Service Account for Jenkins

#### If kubernetes version is < 1.24.0

- Create a kubernetes service account

```bash
kubectl create serviceaccount jenkins
```
- Create a role binding

```bash
cat <<EOF | kubectl create -f -
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
 name: jenkins-integration
 labels:
   k8s-app: jenkins-image-builder
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: jenkins
  namespace: default
EOF
```

#### If kubernetes version is >= 1.24.0

- Create a **secret** for service account jenkins


```bash
cat <<EOF | kubectl create -f -
apiVersion: v1
kind: Secret
type: kubernetes.io/service-account-token
metadata:
 name: jenkins
 annotations:
   kubernetes.io/service-account.name: jenkins
EOF
```

- Then extract the token using below command:

```bash
kubectl get secrets jenkins -o jsonpath='{.data.token}' | base64 -d
```

#### The returend value is the Secret, copy it and paste it in the credentials.
