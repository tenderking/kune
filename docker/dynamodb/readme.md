This is for setting up docker and running dynamodb

```bash
aws dynamodb describe-table --table-name Name_of_table --query "Table" > table_schema.json --endpoint-url http://localhost:8000

aws dynamodb describe-table --table-name Services-v0.0.2 --query "Table" > table_schema_v0.0.2.json --endpoint-url http://localhost:8000

```

to view all items in a table


```bash
aws dynamodb scan --table-name Name_of_table --query 'Items[*]' --endpoint-url http://localhost:8000

aws dynamodb list-tables --endpoint-url http://localhost:8000

aws dynamodb get-item --table-name Services --key '{"ServiceID": {"N": "213"}, "ServiceName": {"S": "Classifieds"}}' --endpoint-url http://localhost:8000

aws dynamodb batch-write-item --table-name Services-v0.0.2 --request-items file://data/ddb_data.json --endpoint-url http://localhost:8000
aws dynamodb batch-write-item --table-name kune-v.0.0.1 --request-items file://data/ddb_data2.json --endpoint-url http://localhost:8000

```

```bash
aws dynamodb create-table \
  --table-name UserFavorites-v.0.0.1 \
  --attribute-definitions \
    AttributeName=UserID,AttributeType=S \
    AttributeName=ServiceID,AttributeType=S \
    AttributeName=DateAdded,AttributeType=S \
    AttributeName=ServiceName,AttributeType=S \
  --key-schema AttributeName=UserID,KeyType=HASH AttributeName=ServiceID,KeyType=RANGE \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
  --global-secondary-indexes \
    "IndexName=DateAdded-index,KeySchema=[{AttributeName=DateAdded,KeyType=HASH},{AttributeName=UserID,KeyType=RANGE},{AttributeName=ServiceID,KeyType=RANGE}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=1,WriteCapacityUnits=1}" \
    "IndexName=ServiceName-index,KeySchema=[{AttributeName=ServiceName,KeyType=HASH},{AttributeName=UserID,KeyType=RANGE},{AttributeName=ServiceID,KeyType=RANGE}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=1,WriteCapacityUnits=1}"\
    --endpoint-url http://localhost:8000


```
```bash
aws dynamodb create-table \
  --table-name UserServices-v0.0.1 \
  --attribute-definitions \
    AttributeName=UserID,AttributeType=S \
    AttributeName=ServiceID,AttributeType=S \
    AttributeName=DateAdded,AttributeType=S \
    AttributeName=ServiceName,AttributeType=S \
  --key-schema AttributeName=UserID,KeyType=HASH AttributeName=ServiceID,KeyType=RANGE \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
  --global-secondary-indexes \
    "IndexName=DateAdded-index,KeySchema=[{AttributeName=DateAdded,KeyType=HASH},{AttributeName=UserID,KeyType=RANGE},{AttributeName=ServiceID,KeyType=RANGE}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=1,WriteCapacityUnits=1}" \
    "[{IndexName=ServiceName-index,KeySchema=[{AttributeName=ServiceName,KeyType=HASH},{AttributeName=UserID,KeyType=RANGE},{AttributeName=ServiceID,KeyType=RANGE}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=1,WriteCapacityUnits=1}}]"\
    --endpoint-url http://localhost:8000


```

```sh
aws dynamodb create-table \
  --table-name "kune-v.0.0.1" \
  --region localhost \
  --endpoint-url http://localhost:8000 \
  --attribute-definitions \
    AttributeName=PK,AttributeType=S \
    AttributeName=SK,AttributeType=S \
    AttributeName=Category,AttributeType=S \
    AttributeName=Tags,AttributeType=SS \
    AttributeName=User,AttributeType=S \
  --key-schema \
    AttributeName=PK,KeyType=HASH \
    AttributeName=SK,KeyType=RANGE \
  --provisioned-throughput \
    ReadCapacityUnits=5,WriteCapacityUnits=5 \
  --global-secondary-indexes \
  "[
        {
            \"IndexName\": \"Category-index\",
            \"KeySchema\": [{\"AttributeName\": \"Category\", \"KeyType\": \"HASH\"}, {\"AttributeName\": \"SK\", \"KeyType\": \"RANGE\"}],
            \"Projection\": {\"ProjectionType\": \"ALL\"},
            \"ProvisionedThroughput\": {\"ReadCapacityUnits\": 1, \"WriteCapacityUnits\": 1}
        },
        {
            \"IndexName\": \"User-index\",
            \"KeySchema\": [{\"AttributeName\": \"User\", \"KeyType\": \"HASH\"}, {\"AttributeName\": \"SK\", \"KeyType\": \"RANGE\"}],
            \"Projection\": {\"ProjectionType\": \"ALL\"},
            \"ProvisionedThroughput\": {\"ReadCapacityUnits\": 1, \"WriteCapacityUnits\": 1
            }
        }
    ]" 


```

```bash
aws dynamodb query \
    --table-name kune-v.0.0.1 \
    --index-name Category-index \
    --key-condition-expression "Category = :Category" \
    --expression-attribute-values  '{":Category":{"S":"Business"}}' \
    --endpoint-url http://localhost:8000

aws dynamodb query \
    --table-name kune-v.0.0.1 \
    --key-condition-expression "Category = :Category" \
    --expression-attribute-values  '{":Category":{"S":"Business"}}' \
    --endpoint-url http://localhost:8000
```