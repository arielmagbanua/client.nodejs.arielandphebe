<template>
  <v-card class="ma-2" color="#26c6da" dark>
    <v-card-title>
      <v-icon large left>mdi-twitter</v-icon>
      <span class="title font-weight-light">
        <a class="tweet-profile" :href="owner.profile_url" target="_blank">@{{ owner.screen_name }}</a>
      </span>
    </v-card-title>

    <v-card-text class="headline font-weight-bold">"{{ text }}"</v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            :src="owner.profile_image_url"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            <a class="tweet-profile" :href="owner.profile_url" target="_blank">{{ owner.name }}</a>
          </v-list-item-title>
        </v-list-item-content>

        <v-row align="center" justify="end">
          <a class="like-tweet" :href="'https://twitter.com/intent/like?tweet_id=' + id">
            <v-icon class="mr-1">mdi-heart</v-icon>
            <!-- <span class="subheading mr-2">{{ likes }}</span> -->
          </a>

          <a class="share-tweet" :href="'https://twitter.com/intent/retweet?tweet_id=' + id">
            <span class="mr-1">·</span>
            <v-icon class="mr-1">mdi-share-variant</v-icon>
            <!-- <span class="subheading">{{ shares }}</span> -->
          </a>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<style lang="scss">
a {
  &.like-tweet,
  &.share-tweet,
  &.tweet-profile {
    text-decoration: none;
    color: white !important;
  }
}
</style>

<script>
export default {
  props: {
    id: String,
    text: String,
    owner: Object,
    media: Array
    // likes: Number,
    // shares: Number
  },

  data: () => ({
    
  })
};
</script>