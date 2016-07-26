require('babel-polyfill');

import $ from 'jquery';

export default class{
  constructor(apiKey = 'dc6zaTOxFJmzC') {
    this.apiKey = apiKey;
    this.baseUrl = `http://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}`;

    setTimeout(() => this.search('poke'), 100);
  }

  async search(query, limit = 24) {
    try {
      const searchUrl = `${this.baseUrl}&q=${encodeURI(query)}&limit=${limit}`;
      const results = await new Promise((resolve, reject) => {
        $.getJSON(searchUrl, data => {
          resolve(data.data);
        });
      });

      return results;
    }
    catch (erros) {
      console.log(erros);
    }
  }
}
