variable "table_name" {
  description = "A name value for naming created resources"
  type        = string
}

variable "environment" {
  type        = string
  description = "The environment name to use for resolving variables"
  default     = "default"
}

variable "tags" {
  type = map(string)
  default = {
    "Key" = "Value"
  }
}

variable "hash_key" {
  description = "The (optional) name of the DynamoDb table string hash key"
  type        = string
  default     = "id"
}

variable "range_key" {
  description = "The (optional) name of the DynamoDb table string range key"
  type        = string
  default     = "timestamp"
}

variable "range_key_enabled" {
  description = "The (optional) flag that specifies whether to use the range_key"
  type        = bool
  default     = false
}

variable "attributes" {
  description = "Additional DynamoDB attributes in the form of a list of mapped values"
  type = list(object({
    name = string
    type = string
  }))
  default = []
}
variable "gsi_map" {
  description = "Additional global secondary indexes in the form of a list of mapped values"
  type = list(object({
    hash_key           = string
    name               = string
    non_key_attributes = optional(list(string))
    projection_type    = string
    range_key          = optional(string)
    read_capacity      = optional(number)
    write_capacity     = optional(number)
  }))
  default = []
}

variable "additional_attributes" {
  description = "Additional DynamoDB attributes in the form of a list of mapped values"
  type = list(object({
    name = string
    type = string
  }))
  default = []
}

