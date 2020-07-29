provider "google" {
  project = var.project_id
}

resource "google_container_cluster" "primary" {
  name               = var.cluster_name
  location           = var.cluster_location
  initial_node_count = var.cluster_initial_node_count

  node_config {
    machine_type = var.cluster_machine_type
    oauth_scopes = [
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
    ]
  }
}
