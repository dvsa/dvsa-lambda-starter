#!/bin/bash

echo "Populating VehicleTestStations table with dummy data..."

AWS_PAGER="" aws dynamodb batch-write-item \
  --endpoint-url http://localhost:8000 \
  --request-items file://vehicle-test-stations-table-data.json
