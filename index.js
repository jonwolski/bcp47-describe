const bcp47 = require('bcp-47')
const iso639 = require('iso-639-3')
const { find, keyBy } = require('lodash')


function describeLang(tag) {
  const parsed = bcp47.parse(tag, {normalize: true})

  return find(iso639, function(lang) {
    // TODO handle the case where parsed.language is null or undefined
    if (parsed.language.length === 2 && lang.iso6391 === parsed.language) {
      return true
    } else if ((lang.iso6393 || lang.iso6392T || lang.iso639B) === parsed.language) {
      return true
    } else {
      return false
    }
  }).name
}

module.exports = describeLang
