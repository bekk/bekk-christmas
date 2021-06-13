---
calendar: thecloud
post_year: 2020
post_day: 1
title: Creating preview environments using Kubernetes external-dns
image: https://raw.githubusercontent.com/landro/external-dns-poc/master/success.png
ingress: >-
  With the age of continuous delivery sometimes comes the need for creating
  multiple short-lived test environments. There a many ways one could achieve
  this, but in this blog post I'll use [Kubernetes
  external-dns](https://github.com/kubernetes-sigs/external-dns).

  The basic idea is to create one test environment per code branch, and create what I like to call preview environments which use the git-commit SHA as part of the hostname where the app will be hosted. OK, let's get started!  
description: Using Kubernetes external-dns and Digital Ocean to creat short
  lived preview environments for testing purposes
links:
  - url: https://github.com/landro/external-dns-poc
    title: Source code
authors:
  - Stefan Magnus Landrø
---
I'll be hosting my preview environments on [Digital Ocean's hosted Kubernetes service](https://www.digitalocean.com/products/kubernetes/),
so you'll need an account with them. In addition, you'll need a registered domain name; Personally I always keep a couple domain names around 
for demos like this one, but I'll be referring to __example.com__ in the code below. 

We'll be using some command line tools too, so make sure you install the following tools using your favourite package manager

- [doctl](https://github.com/digitalocean/doctl) (Digitial Ocean CLI)
- [tfenv](https://github.com/tfutils/tfenv) (A Terraform version manager)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) (Kubernetes CLI)
- [helm v3](https://helm.sh/) (Kubernetes package manager)
- [jsonnet](https://jsonnet.org/) (A data templating language)

## Software defined infrastructure using Terraform 

Let's start out by defining your infrastructure using Terraform. We'll spin up a small k8s cluster and a DNS zone.

First create a Terraform variables file in JSON format (you'll see why we use JSON instead of HCL in a few moments). 
It should look similar to this (make sure you replace example.com with your domain name): 
```json
{
  "domain_name" : "preview.example.com",
  "mypreview_name" : "mypreview",
  "acme_email" : "example@example.com",
  "acme_issuer" : "letsencrypt-staging"
}
``` 

Next, define the k8s cluster and create the DNS zone with DO:

```HCL
variable "domain_name" {}
variable "mypreview_name" { description = "Not used in terraform config" }
variable "acme_email" { description = "Not used in terraform config" }
variable "acme_issuer" { description = "Not used in terraform config" }

terraform {
  required_version = "0.14.0"
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "2.0.2"
    }
  }
}

provider "digitalocean" {
  // DIGITALOCEAN_TOKEN
}

resource "digitalocean_kubernetes_cluster" "default" {
  name = "external-dns-test"
  # doctl compute region list
  region = "fra1"
  # doctl kubernetes options versions`
  version      = "1.19.3-do.0"
  auto_upgrade = true

  node_pool {
    name = "default-pool"
    # doctl compute size list
    size       = "s-2vcpu-2gb"
    node_count = 3
  }
}

output "kubeconfig" {
  value = "Download kubeconfig:    doctl kubernetes cluster kubeconfig save ${digitalocean_kubernetes_cluster.default.id}    "
}

// Will register domain in
resource "digitalocean_domain" "default" {
  name = var.domain_name
}
```

Next, grab an access token from your account pages at DO, and export it to your shell:

    export DIGITALOCEAN_TOKEN="xxx"

To create this tiny infrastructure with DO, run the usual ```terraform apply```. This will, unlike some other cloud 
vendors like for instance Microsoft Azure, just take a few minutes to complete.

Now, this apply actually created a DNS zone for you with DO, and you'll have to add **NS** records to your existing DNS provider config. 
Since we'll be using __.preview.example.com__ as suffix for all our preview domain names, your can delegate only this subdomain 
to the DO name servers (you might also consider this a security feature, as in "blast radius" mitigation, in case you don't trust external-dns). 
Put config similar to the following in the root name server of your domain name:     

	preview.example.com. 	NS 	60 	
    ns1.digitalocean.com.
    ns2.digitalocean.com.
    ns3.digitalocean.com. 

## Deploy time: external-dns! 

Before we can move on running commands against our k8s cluster, we first have to get hold of our k8s credentials.
Retrieve the kubeconfig by running the command output by the previous __terraform apply__ (_doctl kubernetes cluster kubeconfig save xxxxx_).   

Next, deploy an nginx ingress controller using helm v3:

    helm install nginx ingress-nginx --repo https://kubernetes.github.io/ingress-nginx
    
Continue by deploying [external-dns](https://github.com/kubernetes-sigs/external-dns), piping jsonnet output to kubectl. 
We're using jsonnet here in order to keep our config nice and __DRY__. Notice how we're using the same variables config 
file as for terraform, and how we're reading env vars into the config:

```jsonnet
local serviceAccount = {
  apiVersion: 'v1',
  kind: 'ServiceAccount',
  metadata: {
    name: 'external-dns',
  },
};
local clusterRole = {
  apiVersion: 'rbac.authorization.k8s.io/v1beta1',
  kind: 'ClusterRole',
  metadata: {
    name: 'external-dns',
  },
  rules: [
    {
      apiGroups: [
        '',
      ],
      resources: [
        'services',
        'endpoints',
        'pods',
      ],
      verbs: [
        'get',
        'watch',
        'list',
      ],
    },
    {
      apiGroups: [
        'extensions',
        'networking.k8s.io',
      ],
      resources: [
        'ingresses',
      ],
      verbs: [
        'get',
        'watch',
        'list',
      ],
    },
    {
      apiGroups: [
        '',
      ],
      resources: [
        'nodes',
      ],
      verbs: [
        'list',
      ],
    },
  ],
};
local clusterRoleBinding = {
  apiVersion: 'rbac.authorization.k8s.io/v1beta1',
  kind: 'ClusterRoleBinding',
  metadata: {
    name: 'external-dns-viewer',
  },
  roleRef: {
    apiGroup: 'rbac.authorization.k8s.io',
    kind: 'ClusterRole',
    name: 'external-dns',
  },
  subjects: [
    {
      kind: 'ServiceAccount',
      name: 'external-dns',
      namespace: 'default',
    },
  ],
};
local deployment = {
  local tfvars = import 'terraform.tfvars.json',
  local doToken = std.extVar('DIGITALOCEAN_TOKEN'),
  apiVersion: 'apps/v1',
  kind: 'Deployment',
  metadata: {
    name: 'external-dns',
  },
  spec: {
    replicas: 1,
    selector: {
      matchLabels: {
        app: 'external-dns',
      },
    },
    strategy: {
      type: 'Recreate',
    },
    template: {
      metadata: {
        labels: {
          app: 'external-dns',
        },
      },
      spec: {
        serviceAccountName: 'external-dns',
        containers: [
          {
            name: 'external-dns',
            image: 'k8s.gcr.io/external-dns/external-dns:v0.7.3',
            args: [
              '--source=ingress',
              '--domain-filter=' + tfvars.domain_name,
              '--provider=digitalocean',
            ],
            env: [
              {
                name: 'DO_TOKEN',
                value: doToken,
              },
            ],
          },
        ],
      },
    },
  },
};
{
  kind: 'List',
  apiVersion: 'v1',
  items: [serviceAccount, clusterRole, clusterRoleBinding, deployment],
}

```

To deploy the previous config to your k8s cluster, run the following command: 

    jsonnet external-dns.jsonnet --ext-str DIGITALOCEAN_TOKEN=$DIGITALOCEAN_TOKEN | kubectl apply -f -
        
## Deploy time: cert manager with ACME DNS01!

Next, we want to make sure to add TLS support to our preview environments. We do that by installing 
[cert-manager](https://github.com/jetstack/cert-manager) in our cluster

    kubectl create namespace cert-manager
    kubectl apply --validate=false -f https://github.com/jetstack/cert-manager/releases/download/v1.0.3/cert-manager.crds.yaml
    helm install cert-manager cert-manager --namespace cert-manager --version v1.0.3 --repo https://charts.jetstack.io

Next, we add a couple **ClusterIssuer**s to our cluster to make sure cert-manager is using 
[let's encrypt](https://letsencrypt.org/) as the certificate authority:

```jsonnet
local secret = {
  apiVersion: 'v1',
  kind: 'Secret',
  metadata: {
    name: 'digitalocean-dns',
    namespace: 'cert-manager',
  },
  data: {
    local doToken = std.extVar('DIGITALOCEAN_TOKEN'),
    'access-token': std.base64(doToken),
  },
};
local clusterIssuerProd = {
  apiVersion: 'cert-manager.io/v1',
  kind: 'ClusterIssuer',
  metadata: {
    name: 'letsencrypt-prod',
  },
  spec: {
    acme: {
      local tfvars = import 'terraform.tfvars.json',
      email: tfvars.acme_email,
      server: 'https://acme-v02.api.letsencrypt.org/directory',
      privateKeySecretRef: {
        name: 'letsencrypt-prod',
      },
      solvers: [
        {
          dns01: {
            digitalocean: {
              tokenSecretRef: {
                name: 'digitalocean-dns',
                key: 'access-token',
              },
            },
          },
        },
      ],
    },
  },
};
local clusterIssuerStaging = {
  apiVersion: 'cert-manager.io/v1',
  kind: 'ClusterIssuer',
  metadata: {
    name: 'letsencrypt-staging',
  },
  spec: {
    acme: {
      local tfvars = import 'terraform.tfvars.json',
      email: tfvars.acme_email,
      server: 'https://acme-staging-v02.api.letsencrypt.org/directory',
      privateKeySecretRef: {
        name: 'letsencrypt-staging',
      },
      solvers: [
        {
          dns01: {
            digitalocean: {
              tokenSecretRef: {
                name: 'digitalocean-dns',
                key: 'access-token',
              },
            },
          },
        },
      ],
    },
  },
};
{
  kind: 'List',
  apiVersion: 'v1',
  items: [secret, clusterIssuerProd, clusterIssuerStaging],
}
```

Deploy the CRDs to the cluster using the following command:

    jsonnet letsencrypt.jsonnet --ext-str DIGITALOCEAN_TOKEN=$DIGITALOCEAN_TOKEN | kubectl apply -f -

## Deploy time: example app
 
We're approaching the finish line, and will end this tutorial by deploying an example app (dummy nginx container including
_Ingress_, _Service_ and _Deployment_). Notice the annotations on the different resources. Also notice that the _mypreview_ 
domain name is set on the host fields (this is what is actually picked up by external-dns and propageted into the DO DNS Zone).
  
```jsonnet
local ingress = {
  local tfvars = import 'terraform.tfvars.json',
  apiVersion: 'networking.k8s.io/v1beta1',
  kind: 'Ingress',
  metadata: {
    name: 'nginx',
    annotations: {
      'kubernetes.io/ingress.class': 'nginx',
      'cert-manager.io/cluster-issuer': tfvars.acme_issuer,
      'external-dns.alpha.kubernetes.io/ttl': '60',
    },
  },
  spec: {
    rules: [
      {
        host: tfvars.mypreview_name + '.' + tfvars.domain_name,
        http: {
          paths: [
            {
              backend: {
                serviceName: 'nginx',
                servicePort: 80,
              },
            },
          ],
        },
      },
    ],
    tls: [
      {
        hosts: [
          tfvars.mypreview_name + '.' + tfvars.domain_name,
        ],
        secretName: 'myingress-cert',
      },
    ],
  },
};
local service = {
  apiVersion: 'v1',
  kind: 'Service',
  metadata: {
    name: 'nginx',
  },
  spec: {
    ports: [
      {
        port: 80,
        targetPort: 80,
      },
    ],
    selector: {
      app: 'nginx',
    },
  },
};
local deplpoyment = {
  apiVersion: 'apps/v1',
  kind: 'Deployment',
  metadata: {
    name: 'nginx',
  },
  spec: {
    selector: {
      matchLabels: {
        app: 'nginx',
      },
    },
    template: {
      metadata: {
        labels: {
          app: 'nginx',
        },
      },
      spec: {
        containers: [
          {
            image: 'nginx',
            name: 'nginx',
            ports: [
              {
                containerPort: 80,
              },
            ],
          },
        ],
      },
    },
  },
};

{
  kind: 'List',
  apiVersion: 'v1',
  items: [ingress, service, deplpoyment],
}
```

Apply config to cluster by running the following command:

    jsonnet deployment.jsonnet | kubectl apply -f -
        
## Success!

If all goes well, you should now have a preview environment running at https://mypreview.preview.example.com 

## Final comments

Wow! What happened to the promised git SHA being part of the domain name? That is left as an exercise to the reader! 
How you do it is really up to you and your CI/CD workflow, but the only thing you should need to adapt is the way you deploy
the actual deployment - the rest will remain more or less unchanged (Hint: replace mypreview with your git commit). 
