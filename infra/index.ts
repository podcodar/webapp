import * as cloudflare from '@pulumi/cloudflare';
import * as command from '@pulumi/command';
import * as pulumi from '@pulumi/pulumi';

import { discoverWorkerModules, today } from './utils';

const config = new pulumi.Config();
const accountId = config.require('accountId');
const zoneId = config.require('zoneId');
const environment = config.require('environment');
const isProd = environment === 'production';
const workerDomain = isProd ? 'https://prod.podcodar.org' : 'https://dev.podcodar.org';

const builder = new command.local.Command(
  'build-worker',
  {
    create: 'cd .. && bun run w:build > /dev/null && echo $PWD/dist',
    delete: 'echo "No cleanup necessary"',
    environment: {
      BASE_URL: workerDomain,
    },
  },
  {
    replacementTrigger: Date.now().toString(), // Force rebuild on every run
  }
);

const worker = new cloudflare.Worker(
  `podcodar-${environment}`,
  {
    accountId,
    name: `podcodar-${environment}`,
    observability: {
      enabled: true,
      headSamplingRate: 1,
      logs: {
        enabled: true,
        headSamplingRate: 1,
        invocationLogs: true,
      },
    },
  },
  { dependsOn: [builder] }
);

const workerVersion = new cloudflare.WorkerVersion(
  `podcodar-worker-version-${environment}`,
  {
    accountId,
    workerId: worker.id,
    mainModule: 'index.js',
    compatibilityDate: today(),
    compatibilityFlags: ['global_fetch_strictly_public', 'nodejs_compat'],

    assets: {
      directory: builder.stdout.apply((dist) => `${dist}/client/`),
      config: {
        runWorkerFirst: false,
      },
    },

    bindings: [
      { type: 'assets', name: 'ASSETS' },
      {
        name: 'BASE_URL',
        type: 'plain_text',
        text: workerDomain,
      },
    ],

    modules: builder.stdout.apply((serverDir) => discoverWorkerModules(`${serverDir}/server`)),
  },
  { dependsOn: [worker] }
);

const workerDeployment = new cloudflare.WorkersDeployment(
  `podcodar-worker-deployment-${environment}`,
  {
    accountId,
    scriptName: worker.name,
    strategy: 'percentage',
    versions: [
      {
        versionId: workerVersion.id,
        percentage: 100,
      },
    ],
  },
  { dependsOn: [workerVersion] }
);

new cloudflare.WorkersCustomDomain(
  `podcodar-custom-domain-${environment}`,
  {
    zoneId,
    accountId,
    service: worker.name,
    hostname: workerDomain,
  },
  { dependsOn: [worker, workerDeployment] }
);

export const workerScriptName = worker.name;
export const domain = workerDomain;
