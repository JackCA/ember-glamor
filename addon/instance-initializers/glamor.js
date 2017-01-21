import Ember from 'ember';
import { speedy } from 'glamor';
const { isBlank } = Ember;

export function initialize(appInstance) {
  const config = appInstance.resolveRegistration('config:environment');
  const glamorConfig = config.glamor || { };
  let isSpeedy = glamorConfig.isSpeedy;
  if (isBlank(isSpeedy)) {
    isSpeedy = config.environment === 'production';
  }
  speedy(isSpeedy);
}

export default {
  name: 'glamor',
  initialize
};
