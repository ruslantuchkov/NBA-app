import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBxG6_7Eg-CtJ43nh2Nao2uQYnpugz-3rw',
  authDomain: 'nba-udemy.firebaseapp.com',
  databaseURL: 'https://nba-udemy.firebaseio.com',
  projectId: 'nba-udemy',
  storageBucket: 'nba-udemy.appspot.com',
  messagingSenderId: '1015286881288'
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseArticles = firebaseDB.ref('articles');
const firebaseTeams = firebaseDB.ref('teams');
const firebaseVideos = firebaseDB.ref('videos');

const firebaseLooper = snapshot => {
  const data = [];
  snapshot.forEach(childSnapshot => {
    data.push({
      ...childSnapshot.val(),
      id: childSnapshot.key
    });
  });
  return data;
};

export {
  firebase,
  firebaseDB,
  firebaseArticles,
  firebaseTeams,
  firebaseVideos,
  firebaseLooper
};
