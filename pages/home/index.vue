<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="user" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'your_feed'
                  }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed'
                    }
                  }"
                >Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'global_feed'
                  }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed'
                    }
                  }"
                >Global Feed</nuxt-link>
              </li>
              <li v-if="tag" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'tag'
                  }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tag',
                      tag: tag
                    }
                  }"
                >#{{ tag }}</nuxt-link>
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

          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                :class="{
                  active: page === item
                }"
                v-for="item in totalPage"
                :key="item"
              >
                <nuxt-link
                  :to="{
                    name: 'home',
                    query: {
                      page: item,
                      tag: $route.query.tag,
                      tab: tab,
                    }
                  }"
                  class="page-link">{{ item }}
                </nuxt-link>
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                v-for="item in tags"
                :key="item"
                :to="{
                  name: 'home',
                  query: {
                    tag: item,
                    tab: 'tag',
                  }
                }"
                class="tag-pill tag-default"
              >{{ item }}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getArticles,
  getFeedArticles,
} from '@/api/article'
import ArticleItem from '@/components/article-item.vue'
import { getTags } from '@/api/tag'
import { mapState } from 'vuex'
export default {
  name: "HomeIndex",
  components: {
    ArticleItem,
  },
  async asyncData ({ query, store }) {
    // 分页查询
    const page = Number.parseInt(query.page || 1)
    const limit = 20
    const { tag, tab = 'global_feed' } = query
    const loadArticles = (store.state.user && tab === 'your_feed') ? getFeedArticles : getArticles
    // 同步加载数据 文章和标签
    const [ atcicleRes, tagRes ] = await Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag
      }),
      getTags()
    ])

    const { articles, articlesCount } = atcicleRes.data
    const { tags } = tagRes.data
    articles.forEach( article => article.favoriteDisabled = false )
    return {
      articles,
      articlesCount,
      tags,
      limit,
      page,
      tag,
      tab
    }
  },
  watchQuery: ['page', 'tag', 'tab'],
  computed: {
    ...mapState(['user']),
    totalPage () {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
};
</script>

<style></style>
