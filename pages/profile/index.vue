<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="user.image" class="user-img" />
            <h4>{{ user.username }}</h4>
            <p>
              {{ user.bio }}
            </p>
            <button class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp; Follow Eric Simons
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'my_articles'
                  }"
                  :to="{
                    name: 'profile',
                    params: {
                      username: $route.params.username,
                    },
                    query: {
                      tab: 'my_articles'
                    }
                  }"
                  exact
                >
                  My Articles
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'favorited_articles'
                  }"
                  :to="{
                    name: 'profile',
                    params: {
                      username: $route.params.username,
                    },
                    query: {
                      tab: 'favorited_articles'
                    }
                  }"
                  exact
                >
                  Favorited Articles
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <article-item :article="article" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser } from '@/api/user'
import {
  getArticles,
} from '@/api/article'
import ArticleItem from '@/components/article-item.vue'
export default {
  middleware: 'authenticated',
  name: 'ProfileIndex',
  components: {
    ArticleItem,
  },
  data() {
    return {
      user: {},
      articles: [],
      limit: 10
    }
  },

  computed: {
    tab () {
      console.log('this.$route.query.tab', this.$route.query.tab)
      return this.$route.query.tab || 'my_articles'
    }
  },
  watch: {
    tab: {
      handler: function (newVal, oldVal) {
        this.loadArticles()
      }
    }
  },
  async mounted () {
    const { data } = await getUser()
    this.user = data.user
    this.loadArticles()
  },
  methods: {
    //TODO 分页处理
    async loadArticles () {
      let params = {
        imit: this.limit,
        offset: 0,
        [this.tab === 'my_articles' ?  'author' : 'favorited']: this.user.username
      }
      const { data } = await getArticles(params)
      this.articles = data.articles
    }
  }
};
</script>

<style></style>
