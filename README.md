# vankCron

It is an [AWS CDK](https://aws.amazon.com/cdk/) project that displays a lambda function, which is executed once a day, it reads a CSV file from a URL and stores/updates the information in a mongoDB database for later consultation.

## Requirements

- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html) configured in the console.
- [MongoDBStringConnection](https://docs.mongodb.com/manual/reference/connection-string/)(for practical purposes this was set in the code)
- Url of CSV file (for practical purposes this was set in the code)

## Install

1. Clone the repository
```ssh
git clone <vankCronRepository>
```
3. Enter in the folder repository
```ssh
cd vankCron
```
3. Install
```ssh
npm install
```
## Deploy

```ssh
cdk deploy
```
## Destroy
```ssh
cdk destroy
```

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
