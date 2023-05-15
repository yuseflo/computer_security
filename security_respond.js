// I ran this code inside the Twilio development environment,
// which is why I don't have to import any libraries or add any auth tokens

// This function is called by security_transcribe.js

exports.handler = function (context, event, callback) {
  // Twilio SDK to build a voice response
  let twiml = new Twilio.twiml.VoiceResponse();
  // Use Amazon Polly's Joanna text-to-speech engine
  const speech = twiml.say({
    voice: 'Polly.Joanna-Neural',
  });
  // Get person's answer to the question about consent to record the call
  const response = event.SpeechResult;
  console.log('Response: ', response);

  // If person agrees, call gets recorded
  if (response.slice(0, 3) === 'Yes' || response.slice(0, 3) === 'Yea') {
    twiml.record();

    speech.ssmlProsody(
      {
        rate: 'slow',
        volume: 'x-loud',
      },
      'Got it.... Thank you for helping our team. How can I help you today?'
    );
  }
  // Otherwise, the conversation will not be recorded
  else {
    speech.ssmlProsody(
      {
        rate: 'slow',
        volume: 'x-loud',
      },
      'Got it.... The conversation will not be recorded. How can I help you today?'
    );
  }

  return callback(null, twiml);
};
