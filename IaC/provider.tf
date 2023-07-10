provider "aws" {
#   # shared_config_files      = ["$HOME/.aws/config"]
#   # shared_credentials_files = ["$HOME/.aws/credentials"]
#   region                   = "us-east-1"
#   access_key                  = "fake_access_key"
#   secret_access_key           = "fake_secret_key"
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true
#   endpoint                    = "http://localhost:8000" 
}