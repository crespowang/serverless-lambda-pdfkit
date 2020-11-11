# serverless-lambda-pdfkit
Install the dependencies
```
yarn install
```
Run locally offline
```
yarn serverless
```
Build the layer
```
pushd layer && yarn --cwd nodejs && zip -9r pdfkit-layer.zip nodejs && popd
```
Change serverless.yml `profile` to use your AWS profile name, and you can deploy it
```
yarn sls deploy
```
