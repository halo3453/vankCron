import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import events = require('@aws-cdk/aws-events');
import targets = require('@aws-cdk/aws-events-targets');

export class VankCronStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const nodeFetchLayer = new lambda.LayerVersion(this, 'node-fetch', {
      code: lambda.Code.fromAsset('layers/node-fetch/nodejs.zip'),
      compatibleRuntimes: [lambda.Runtime.NODEJS_12_X],
    });

    const mongooseLayer = new lambda.LayerVersion(this, 'mongoose', {
      code: lambda.Code.fromAsset('layers/mongoose/nodejs.zip'),
      compatibleRuntimes: [lambda.Runtime.NODEJS_12_X],
    });

    const vankLambda = new lambda.Function(this, "vanck-cron", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "vanck-cron.handler",
      layers: [nodeFetchLayer, mongooseLayer],
      memorySize: 128,
      timeout: cdk.Duration.seconds(300),
      environment: {
        CONNECTION_STRING: 'mongodb+srv://admin:caxsyf-kazbu0-sEwnuf@cluster0.ywq7f.mongodb.net/vank',
        URL_CSV:'https://gist.githubusercontent.com/rogelio-meza-t/f70a484ec20b8ea43c67f95a58597c29/raw/41f289c605718e923fc1fad0539530e4d0413a90/invoices.csv'
      },
    }); 

    const rule = new events.Rule(this, 'Rule', {
      schedule: events.Schedule.expression('cron(0 12 * * ? *)')
    });

    rule.addTarget(new targets.LambdaFunction(vankLambda));
  }
}
