import Ember from 'ember';
import { initialize } from 'dummy/instance-initializers/glamor';
import { module, test } from 'qunit';
import destroyApp from '../../helpers/destroy-app';
import glamor from 'glamor';

module('Unit | Instance Initializer | glamor', {
  beforeEach() {
    Ember.run(() => {
      this.application = Ember.Application.create();
      this.appInstance = this.application.buildInstance();
      this.appInstance.register('config:environment', {});
      glamor.flush();
    });
  },
  afterEach() {
    Ember.run(this.appInstance, 'destroy');
    destroyApp(this.application);
  }
}, function() {
  module('with glamor config specified', {
    beforeEach() {
      Ember.run(() => {
        this.config = this.appInstance.resolveRegistration('config:environment');
      });
    },
  }, function() {

    module('as true', {
      beforeEach() {
        this.config.glamor = { isSpeedy: true };
      }
    }, function() {
      test('it turns on speedy', function(assert) {
        initialize(this.appInstance);

        assert.ok(glamor.styleSheet.isSpeedy);
      });
    });

    module('as false', {
      beforeEach() {
        this.config.glamor = { isSpeedy: false };
      }
    }, function() {
      test('it turns on speedy', function(assert) {
        initialize(this.appInstance);

        assert.notOk(glamor.styleSheet.isSpeedy);
      });
    });

    module('unspecified', function() {
      module('in production env', {
        beforeEach() {
          this.config.environment = 'production';
        }
      }, function() {
        test('it automatically uses speedy', function(assert) {
          initialize(this.appInstance);
          assert.ok(glamor.styleSheet.isSpeedy);
        });
      });

      module('in non-production env', {
        beforeEach() {
          this.config.environment = 'development';
        }
      }, function() {
        test('it does not automatically uses speedy', function(assert) {
          initialize(this.appInstance);
          assert.notOk(glamor.styleSheet.isSpeedy);
        });
      });
    });

  });
});

