<template>
  <section class="twitter">
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="tweet in tweets"
          :key="tweet.post_id"
          :cols="tweet.flex"
        >
          <tweet-card
            :id="tweet.id"
            :text="tweet.text"
            :owner="tweet.owner"
          />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
  // @ is an alias to /src
  import TweetCard from '@/components/TweetCard';

  import firebase from 'firebase/app';
  // Required for side-effects
  require("firebase/firestore");

  const firebaseConfig = {
    apiKey: "AIzaSyDID0n5CRP77yMMB4SyqDRwgY4hMzv2Pvo",
    authDomain: "arielandphebe.firebaseapp.com",
    databaseURL: "https://arielandphebe.firebaseio.com",
    projectId: "arielandphebe",
    storageBucket: "arielandphebe.appspot.com",
    messagingSenderId: "436648050769",
    appId: "1:436648050769:web:25ba8af9badea69441b870",
    measurementId: "G-2DL2C0PRPX"
  };

  // Initialize Cloud Firestore through Firebase
  firebase.initializeApp(firebaseConfig);

  const firestore = firebase.firestore();

  // firebase.firestore().enablePersistence()
  //   .catch((err) => {
  //     console.error(err);
  //     console.log(err.code);
  //   });

  const tweetCollection = firestore.collection('tweets');

  export default {
    name: 'home',
    components: {
      'tweet-card': TweetCard
    },
    data() {
      return {
        tweets: []
      }
    },
    
    mounted() {
      // TODO: use onSnapShot to obtain cached values first.
      tweetCollection.get()
        .then((querySnapshot) => {
          const tweetPromises = querySnapshot.docs.map(async (doc) => {
            const data = doc.data();
            
            // query first the owner doc
            const owner = await data.owner.get();

            return await {
              id: data.post_id.toString(),
              text: data.text,
              media: data.media,
              owner: owner.data()
            }
          });

          Promise.all(tweetPromises)
            .then((tweets) => {
              // this.tweets = tweets;
              this.tweets = tweets.map((tweet, index) => {
                let cardFlexWidth = 3

                if (index <= 1) {
                  cardFlexWidth = 6;
                }

                // resize for special case where tweet is too long
                if (cardFlexWidth === 3 && tweet.text.length > 100) {
                  cardFlexWidth = 6;
                }
                
                tweet.flex = cardFlexWidth;

                return tweet;
              });
            })
            .catch((err) => {
              console.error(err);
            });
        });
    }
  }
</script>
