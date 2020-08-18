#!/bin/sh

curl -X GET \
  -H 'access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6MSwiaWF0IjoxNTk3NzgxODA5LCJleHAiOjE1OTc3ODc4MDl9.LN__XTADggbrrwNReFug4NzFncH85e2eVY0fKSzuNOI' \
  'http://localhost/api/customer/debts'
