const Alexa = require('ask-sdk-core')
const axios = require('axios')
require('dotenv').config()


function getDirector (title){
    const apikey = process.env.OMDB_API_KEY

    return axios.get('http://www.omdbapi.com/?apikey=${apikey}&t=${title}').then((response) => {
        return response.data.Director
    })
}
const DirectorIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'DirectorIntent'
    },
    handle(handlerInput) {
      const title = handlerInput.requestEnvelope.request.intent.slots.Title.value
      const answer = `The director of ${title} is me. HAHA! Just kidding!`
      const reprompt = 'Would you like information on another movie?'
      return handlerInput.responseBuilder
        .speak(answer + reprompt)
        .reprompt(reprompt)
        .withShouldEndSession(false)
        .getResponse();
    },
  }

  const ErrorHandler = {
      canHandle() {
          return true
      },
      handle(handlerInput) {
          return handlerInput.responseBuilder
          .speak("My bad, didn't catch that. Can you repeat it ?")
          .reprompt("My bad, didn't catch that. Can you repeat it ?")
          .withShouldEndSession(false)
          .getResponse()
      }
  }

  const builder = Alexa.SkillBuilders.custom()
  
  exports.handler = builder
    .addRequestHandlers(DirectorIntentHandler)
    .addErrorHandlers(ErrorHandler)
    .lambda()






