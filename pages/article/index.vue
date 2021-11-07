<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <article-meta :article="article" :isSelfArticle="isSelfArticle" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article="article" :isSelfArticle="isSelfArticle" />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <article-comments :article="article" :isSelfArticle="isSelfArticle" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
import MarkdownIt from 'markdown-it'
import ArticleMeta from './components/article-meta.vue'
import ArticleComments from './components/article-comments.vue'
export default {
  name: 'ArticleIndex',
  components: {
    ArticleMeta,
    ArticleComments
  },
  async asyncData ({ params, store }) {
    const { data } = await getArticle(params.slug)
    const { article } = data
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    console.log(store.state.user.username)
    console.log(article.author.username)
    return {
      article,
      isSelfArticle: article.author.username === store.state.user.username
    }
  }
};
</script>

<style></style>
