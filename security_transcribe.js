// I ran this code inside the Twilio development environment,
// which is why I don't have to import any libraries or add any auth tokens

// Transcribe function that runs after calling the registered Twilio number -
// this function calls security_respond.js

exports.handler = function (context, event, callback) {
  // Twilio SDK to build a voice response
  let twiml = new Twilio.twiml.VoiceResponse();
  // Start talking after 1 sec delay
  twiml.pause({
    length: 1,
  });
  // Use Amazon Polly's Joanna text-to-speech engine
  const say = twiml.say({
    voice: 'Polly.Joanna-Neural',
  });
  // Speak slowly and loud
  // Use informative approach to get consent to record the conversation
  say.ssmlProsody(
    {
      rate: 'slow',
      volume: 'x-loud',
    },
    'As part of our commitment to improving our services, we may record this conversation for quality assurance purposes. Is it okay with you if we proceed with the recording?'
  );

  // Speech recognition and redirection to /security_respond function
  twiml.gather({
    enhanced: 'false',
    speechTimeout: 'auto',
    speechModel: 'phone_call',
    input: 'speech',
    action: '/security_respond',
  });

  return callback(null, twiml);
};
