var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var from = 'jesus';
    var text = 'i love everyone in perth'
    var message = generateMessage(from, text);
    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    expect(message.createdAt).toBeA('number');
  })
});

describe('generateLocationMessage', () => {
  it('should generate the correct location object', () => {
    var from = 'jesus';
    var lat = 40;
    var lng = -74;
    var message = generateLocationMessage(from, lat, lng);
    expect(message.from).toBe(from);
    expect(message.url).toBe('https://www.google.com/maps?q=40,-74');
    expect(message.createdAt).toBeA('number');
  });
});
