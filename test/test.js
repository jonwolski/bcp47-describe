var expect = require('chai').expect;
var describeLang = require('../index');

describe('Describing a primary language tag', function () {
  it('describes `en` as "English"', function () {
    const actual = describeLang('en')
    expect(actual).to.eq('English')
  });

  it('describes `es` as "Spanish"', function () {
    const actual = describeLang('es')
    expect(actual).to.eq('Spanish')
  });

  it('describes `cmn` as "Mandarin Chinese"', function () {
    const actual = describeLang('cmn')
    expect(actual).to.eq('Mandarin Chinese')
  });

  it('handles macro languages', function () {
    const actual = describeLang('zh-cmn')
    expect(actual).to.eq('Mandarin Chinese')
  });
});

describe('A lanugage with region or territory', function() {
  it('handles ISO 3166-1 alpha-2 territory codes', function() {
    const actual = describeLang('es-PR')
    expect(actual).to.eq('Spanish (Puerto Rico)')
  })

  it('handles UN M.49 region codes', function() {
    const actual = describeLang('es-419')
    expect(actual).to.eq('Spanish (Latin America and the Caribbean)')
  })
})
