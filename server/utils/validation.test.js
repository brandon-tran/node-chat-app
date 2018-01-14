var expect = require('expect');
var {isRealString} = require('./validation');

describe('isRealString' , () => {
  it('should reject non-string values', () => {
    var res = isRealString(1231);
    expect(res).toBe(false);
  });
  it('should reject string with only spaces', () => {
    var res = isRealString('         ');
    expect(res).toBe(false);
  });
  it('should allow string with non space characters', () => {
    var res = isRealString('Hello friend!');
    expect(res).toBe(true);
  });

});
