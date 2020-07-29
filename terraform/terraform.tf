terraform {
  backend "remote" {
    organization = "internet-banking"

    workspaces {
      name = "production"
    }
  }
}
