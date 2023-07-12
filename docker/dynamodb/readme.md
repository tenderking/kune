This is for setting up docker and running dynamodb

aws dynamodb describe-table --table-name Name_of_table --query "Table" > table_schema.json --endpoint-url http://localhost:8000

aws dynamodb describe-table --table-name Services-v0.0.2 --query "Table" > table_schema_v0.0.2.json --endpoint-url http://localhost:8000

```

to view all items in a table

```

aws dynamodb scan --table-name Name_of_table --query 'Items[*]' --endpoint-url http://localhost:8000

aws dynamodb list-tables --endpoint-url http://localhost:8000

aws dynamodb get-item --table-name Services --key '{"ServiceID": {"N": "213"}, "ServiceName": {"S": "Classifieds"}}' --endpoint-url http://localhost:8000

aws dynamodb batch-write-item --table-name Services-v0.0.2 --request-items file://data/ddb_data.json --endpoint-url http://localhost:8000

```

```
