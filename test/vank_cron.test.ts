import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as VankCron from '../lib/vank_cron-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new VankCron.VankCronStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
