import { AuthGateway } from '@infra/gateways/AuthGateway';
import { Injectable } from '@kernel/di/Injectable';

@Injectable()
export class ForgotPasswordUseCase {
  constructor(private readonly authGateway: AuthGateway) {}

  async execute({
    email,
  }: ForgotPasswordUseCase.Input): Promise<ForgotPasswordUseCase.Output> {
    await this.authGateway.forgotPassowrd({
      email,
    });
  }
}

export namespace ForgotPasswordUseCase {
  export type Input = {
    email: string;
  };

  export type Output = void;
}
