variable "vercel_api_token" {
  description = "Vercel API Token"
  type        = string
  sensitive   = true
}

variable "github_token" {
  description = "GitHub API Token"
  type        = string
  sensitive   = true
}

terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.8.0"
    }
    github = {
      source  = "integrations/github"
      version = "~> 5.0"
    }
  }
}

provider "vercel" {
  api_token = var.vercel_api_token
}

provider "github" {
  token = var.github_token
}

# Create a Vercel Project
resource "vercel_project" "beautotester" {
  name      = "beautotester"
}

# Store Vercel API Token in GitHub Secrets for Actions
resource "github_actions_secret" "vercel_token" {
  repository     = "beautotester"
  secret_name    = "VERCEL_TOKEN"
  plaintext_value = var.vercel_api_token
}