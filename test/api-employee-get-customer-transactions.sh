#!/bin/sh

curl -X GET \
  -H 'access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6MSwiaWF0IjoxNTkyOTMwMjIyLCJleHAiOjE1OTI5MzYyMjJ9.4xCMkdz56hMmX5U-Z7Y2SNm5wVfmISNeaPctSzm2Vk0' \
  'http://localhost/api/employee/get-customer-transactions?credit_number=025917154505'
