const bcp47 = require('bcp-47')
const iso639 = require('iso-639-3')
const iso3166_1 = require('iso-3166-1')
const m49 = require('m49-regions')
const { keyBy } = require('lodash')

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

function regionName(code, tree) {
  let name = null
  for (let key in tree) {
    let node = tree[key]
    if (code == node.code) {
      name = node.name
    } else if (node.sub && node.sub.length) {
      name = regionName(code, node.sub)
    }
    if (name) {
      return name
    }
  }
  return name
}

function regionOrTerritoryName(code) {
  if (code.length === 2) {
    return iso3166_1.whereAlpha2(code).country
  } else {
    return regionName(code, m49)
  }
}

function describeLang(tag) {
  const parsed = bcp47.parse(tag, {normalize: true})
  let lang = findPrimaryLanguage(parsed.language)
  let description = null
  if (lang.scope === 'macrolanguage' && parsed.extendedLanguageSubtags.length > 0) {
    lang = findPrimaryLanguage(parsed.extendedLanguageSubtags[0])
  }

  description = lang.name

  if (parsed.region) {
    description = `${description} (${regionOrTerritoryName(parsed.region)})`
  }
  return description
}

module.exports = describeLang
