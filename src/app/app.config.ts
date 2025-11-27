import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "fapd-5ca47", appId: "1:849544561844:web:6b4b407ce5b200054b03e1", storageBucket: "fapd-5ca47.firebasestorage.app", apiKey: "AIzaSyDjHWQsUFi1zq9ba-CwvO6W8hIA6vp3GIc", authDomain: "fapd-5ca47.firebaseapp.com", messagingSenderId: "849544561844"})), provideFirestore(() => getFirestore())
  ]
};
