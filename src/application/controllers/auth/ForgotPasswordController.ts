import { Controller } from '@application/contracts/Controller';
import { BadRequest } from '@application/errors/http/BadRequest';
import { ForgotPasswordUseCase } from '@application/usecases/auth/ForgotPasssword';
import { Schema } from '@kernel/decorators/schema';
import { Injectable } from '@kernel/di/Injectable';
import {
  ForgotPasswordBody,
  forgotPasswordSchema,
} from './schemas/forgotPasswordSchema';

@Injectable()
@Schema(forgotPasswordSchema)
export class ForgotPasswordController extends Controller<
  'public',
  ForgotPasswordController.Response
> {
  constructor(private readonly forgotPasswordUseCase: ForgotPasswordUseCase) {
    super();
  }

  protected override async handle({
    body,
  }: Controller.Request<'public', ForgotPasswordBody>): Promise<
    Controller.Response<ForgotPasswordController.Response>> {
    try {
      const { email } = body;

      await this.forgotPasswordUseCase.execute({
        email,
      });

      return {
        statusCode: 204,
      };
    } catch {
      throw new BadRequest('Failed. Try again.');
    }
  }
}

export namespace ForgotPasswordController {
  export type Response = null;
}
