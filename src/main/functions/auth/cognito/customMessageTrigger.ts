import { CustomMessageTriggerEvent } from 'aws-lambda';

export async function handler(event: CustomMessageTriggerEvent){
  if(event.triggerSource === 'CustomMessage_ForgotPassword'){
    const code = event.request.codeParameter;

    event.response.emailSubject = '🍏 foodiary | Recupere sua conta!';
    event.response.emailMessage = `O seu codigo de recuperação é: ${code}`;
  }
  
  return event;
}
