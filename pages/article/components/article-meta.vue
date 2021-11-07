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

    <div v-if="!isSelfArticle">
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

    <div v-else>
      <nuxt-link
        class="btn btn-sm btn-outline-secondary"
        :to="{
          name: 'editArticle',
          params: {
            slug: article.slug
          }
        }"
      >
        <i class="ion-edit"></i>
        &nbsp; Edit Article
      </nuxt-link>
      &nbsp;
      <button
        @click="handleDelete"
        class="btn btn-sm btn-outline-primary active"
      >
        <i class="ion-trash-a"></i>
        &nbsp; Delete Article
      </button>
    </div>
  </div>
</template>

<script>
import { deleteArticle } from '@/api/article'

export default {
  name: "ArticleMate",
  props: {
    article: {
      type: Object,
      required: true
    },
    isSelfArticle: {
      type: Boolean,
      required: false
    }
  },
  mounted() {
  },
  methods: {
    async handleDelete () {
      await deleteArticle(this.article.slug)
      this.$router.push('/')
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
