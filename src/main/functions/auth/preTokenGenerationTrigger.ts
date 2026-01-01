import 'reflect-metadata';

import { AccountRepository } from '@infra/database/dynamo/repositories/AccountRepository';
import { Registry } from '@kernel/di/Registry';
import { PreTokenGenerationV2TriggerEvent } from 'aws-lambda';

const repo = Registry.getInstance().resolve(AccountRepository);
export async function handler(event: PreTokenGenerationV2TriggerEvent){

  const user = await repo.findEmail(event.request.userAttributes.email);

  console.log(user?.id);

  event.response = {
    claimsAndScopeOverrideDetails: {
      accessTokenGeneration: {
        claimsToAddOrOverride: {
          internalId: user!.id,
        },
      },
    },
  };

  return event;
}
