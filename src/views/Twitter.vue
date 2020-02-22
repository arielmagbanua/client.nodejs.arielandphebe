<template>
  <section class="twitter">
    <v-container fluid>
      <v-row dense>
        <v-col v-for="tweet in tweets" :key="tweet.post_id" :cols="tweet.flex">
          <tweet-card :id="tweet.id" :text="tweet.text" :owner="tweet.owner" :media="tweet.media" />
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-if="dialogTweet" v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card color="#e0f7fa">
        <v-toolbar color="#26c6da" dark max-height="300">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <v-toolbar-title>
            <a class="tweet-profile" :href="dialogTweet.owner.profile_url" target="_blank">
              <v-card-text class="headline">
                - @{{ dialogTweet.owner.screen_name }} | {{ dialogTweet.owner.name }}
              </v-card-text>
            </a>
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-container fluid :style="{ 'overflow-y': 'auto' }">
          <v-row dense>
            <v-card-text class="headline font-weight-bold">
              "{{ dialogTweet.text }}"
            </v-card-text>
          </v-row>
          <v-row dense>
            <v-col
                v-for="image in dialogTweet.media"
                :key="image"
                class="d-flex child-flex"
                :cols="dialogTweetImageCols"
              >
                <v-card flat tile class="d-flex">
                  <v-img
                    :src="image"
                    :lazy-src="image"
                    aspect-ratio="2.5"
                    :contain="imageContain"
                    :style="{'background-color': '#e0f7fa'}"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-card>
              </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
// @ is an alias to /src
import TweetCard from "@/components/TweetCard";

import firebase from "firebase/app";
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
const tweetCollection = firestore.collection("tweets");

export default {
  name: "home",
  components: {
    "tweet-card": TweetCard
  },

  data() {
    return {
      tweets: [],
      dialog: false,
      dialogTweet: null,
    };
  },

  computed: {
    dialogTweetImageCols(){
      return this.dialogTweet.media.length / 4;
    },
    imageContain(){
      return this.dialogTweet.media.length <= 2;
    }
  },

  mounted() {
    this.$on("open-tweet", tweet => {
      console.log("opening tweet!!!");
      console.log(tweet);
      this.dialog = true;
      this.dialogTweet = tweet;
    });

    // TODO: use onSnapShot to obtain cached values first.
    tweetCollection.get().then(querySnapshot => {
      const tweetPromises = querySnapshot.docs.map(async doc => {
        const data = doc.data();

        // query first the owner doc
        const owner = await data.owner.get();

        return await {
          id: data.post_id.toString(),
          text: data.text,
          media: data.media,
          owner: owner.data()
        };
      });

      Promise.all(tweetPromises)
        .then(tweets => {
          // this.tweets = tweets;
          this.tweets = tweets.map((tweet, index) => {
            // default flex size
            let cardFlexWidth = 3;

            if (index <= 1) {
              cardFlexWidth = 4;
            }

            // resize for special case where tweet is too long
            if (
              (cardFlexWidth === 3 && tweet.text.length > 100) ||
              tweet.media.length > 0
            ) {
              cardFlexWidth = 4;
            }

            tweet.flex = cardFlexWidth;

            return tweet;
          });
        })
        .catch(err => {
          console.error(err);
        });
    });
  }
};
</script>
