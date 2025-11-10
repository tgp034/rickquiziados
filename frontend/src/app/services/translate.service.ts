import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class GoogleTranslateService {
  constructor() { }

  async translate(text: string, targetLanguage: string) {
    const url = 'https://google-translate113.p.rapidapi.com/api/v1/translator/text';
    const headers = {
      'content-type': 'application/x-www-form-urlencoded',
      'x-rapidapi-host': 'google-translate113.p.rapidapi.com',
      //'x-rapidapi-key': '741137f3afmsh1baa04647476273p1907a0jsn504babd0d146'
      'x-rapidapi-key': '7cefcc7c71msha5824dcf79c377cp184e27jsn17aac0f54637'
    };

    const encodedParams = new URLSearchParams();
    encodedParams.set('from', 'auto');
    encodedParams.set('to', targetLanguage);
    encodedParams.set('text', text);

    const options = {
      method: 'POST',
      url: url,
      headers: headers,
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
} 