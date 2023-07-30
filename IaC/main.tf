resource "aws_dynamodb_table" "services-table-v2" {
  name           = var.table_name
  hash_key       = var.hash_key
  range_key      = var.range_key_enabled ? var.range_key : null
  read_capacity  = 5
  write_capacity = 5

  # Required block for hash key attribute
  attribute {
    name = var.hash_key
    type = "S"
  }

  # Optional block for range key attribute (if used)
  dynamic "attribute" {
    for_each = var.range_key_enabled ? [var.range_key] : []
    content {
      name = attribute.value
      type = "S"
    }
  }

  # Additional attributes
  dynamic "attribute" {
    for_each = var.additional_attributes
    content {
      name = attribute.value.name
      type = attribute.value.type
    }
  }

  dynamic "global_secondary_index" {
    for_each = var.gsi_map
    content {
      hash_key           = global_secondary_index.value.hash_key
      name               = global_secondary_index.value.name
      non_key_attributes = lookup(global_secondary_index.value, "non_key_attributes", null)
      projection_type    = global_secondary_index.value.projection_type
      range_key          = lookup(global_secondary_index.value, "range_key", null)
      read_capacity      = lookup(global_secondary_index.value, "read_capacity", null)
      write_capacity     = lookup(global_secondary_index.value, "write_capacity", null)
    }
  }


}

resource "aws_cognito_user_pool" "kune" {
  name = var.user_pool_name

  # Set the policies for user passwords
  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_uppercase = true
    require_numbers   = true
    require_symbols   = false
  }

  # Configure the email as the username attribute
  username_attributes = ["email"]


  # Optional: Add additional attributes for the user pool (e.g., given_name, family_name, etc.)
  schema {
    name = "given_name"
    attribute_data_type = "String"
    mutable = true
    required = false
  }

  schema {
    name = "family_name"
    attribute_data_type = "String"
    mutable = true
    required = false
  }

  # Optional: Define the email verification settings
  verification_message_template {
    default_email_option = "CONFIRM_WITH_LINK"
    email_message = "Your verification code is {####}."
    email_subject = "Verify your email for our app"
  }
}

output "user_pool_id" {
  value = aws_cognito_user_pool.kune.id
}