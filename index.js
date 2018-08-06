const bcp47 = require('bcp-47')
const iso639 = require('iso-639-3')
const { find, keyBy } = require('lodash')

function primaryBy2Char(lang) {
  return lang.iso6391;
}

function primaryBy3Char(lang) {
  // https://tools.ietf.org/html/rfc5646#section-2.2.1
  return (lang.iso6393 || lang.iso6392T || lang.iso6392B)
}

function findPrimaryLanguage(code) {
   return keyBy(iso639, code.length === 2 ? primaryBy2Char : primaryBy3Char)[code]
}

function describeLang(tag) {
  const parsed = bcp47.parse(tag, {normalize: true})
  return findPrimaryLanguage(parsed.language).name
}

module.exports = describeLang
