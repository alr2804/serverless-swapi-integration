# serverless-swapi-integration


serverless create --template aws-nodejs --path sw-api


npm init -y

npm install aws-sdk


npm install axios serverless-dynamodb-local serverless-offline --save

npm install uuid



<!-- sls dynamodb install -->


sls deploy --verbose



<!-- swagger -->

npm install serverless-openapi-documentation --save-dev

npm install --save-dev serverless-aws-documentation


<!-- tests -->
npm install --save-dev jest

npm install --save-dev aws-sdk-mock


# Endpoints

  * GET - https://30g56hkr03.execute-api.sa-east-1.amazonaws.com/dev/fetch-data

  * POST - https://30g56hkr03.execute-api.sa-east-1.amazonaws.com/dev/character

  * GET - https://30g56hkr03.execute-api.sa-east-1.amazonaws.com/dev/characters

  * GET - https://30g56hkr03.execute-api.sa-east-1.amazonaws.com/dev/character/{id}

  * PUT - https://30g56hkr03.execute-api.sa-east-1.amazonaws.com/dev/character/{id}

  * DELETE - https://30g56hkr03.execute-api.sa-east-1.amazonaws.com/dev/character/{id}

  * GET - https://30g56hkr03.execute-api.sa-east-1.amazonaws.com/dev/planets/fetch

  * POST - https://30g56hkr03.execute-api.sa-east-1.amazonaws.com/dev/planets

  * GET - https://30g56hkr03.execute-api.sa-east-1.amazonaws.com/dev/planets/{id}

  * GET - https://30g56hkr03.execute-api.sa-east-1.amazonaws.com/dev/planets

  * PUT - https://30g56hkr03.execute-api.sa-east-1.amazonaws.com/dev/planets/{id}

  * DELETE - https://30g56hkr03.execute-api.sa-east-1.amazonaws.com/dev/planets/{id}
