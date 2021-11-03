<template>
  <div class="article-meta">
    <nuxt-link :to="{
      name: 'profile',
      username: article.author.username
    }">
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link
        class="author"
        :to="{
          name: 'profile',
          username: article.author.username
        }"
      >
        {{ article.author.username }}
      </nuxt-link>
      <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
    </div>

    <button
      :class="{
        active: article.author.following
      }"
      class="btn btn-sm btn-outline-secondary">
      <i class="ion-plus-round"></i>
      &nbsp; Follow Eric Simons
    </button>
    &nbsp;
    <button
      :class="{
        active: article.favorited
      }"
      class="btn btn-sm btn-outline-primary"
    >
      <i class="ion-heart"></i>
      &nbsp; Favorite Post <span class="counter">(29)</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ArticleMate",
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  // 设置文章的元数据
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.description
        }
      ]
    }
  }
};
</script>

<style></style>
