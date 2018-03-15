var expect = require('expect');
var {generateMessage} = require('./message.js');

describe('generateMessage', () => {
  it('should genterate correct message object', () => {
    var from = 'jen';
    var text = 'some message';
    var message = generateMessage(from, text);

  
    expect(message).toInclude({from, text});
  });
});
