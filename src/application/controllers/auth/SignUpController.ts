import { Controller } from '@application/contracts/Controller';
import { SignUpUseCase } from '@application/usecases/auth/SignUpUseCase';
import { Schema } from '@kernel/decorators/schema';
import { Injectable } from '@kernel/di/Injectable';
import { SignUpBody, signUpSchema } from './schemas/signUpSchema';

@Injectable()
@Schema(signUpSchema)
export class SignUpController extends Controller<SignUpController.Response> {
  constructor(private readonly SignUpUseCase: SignUpUseCase) {
    super();
  }

  protected override async handle({
    body,
  }: Controller.Request<SignUpBody>): Promise<
    Controller.Response<SignUpController.Response>
  > {
    const { account } = body;

    const { accessToken, refreshToken } =
      await this.SignUpUseCase.execute(account);

    return {
      statusCode: 201,
      body: {
        accessToken,
        refreshToken,
      },
    };
  }
}

export namespace SignUpController {
  export type Response = {
    accessToken: string;
    refreshToken: string;
  };
}
