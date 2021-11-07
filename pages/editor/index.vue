<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.title"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.body"
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="article.description"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.tagList"
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle, getArticle, updateArticle } from '@/api/article'
export default {
  // 在路由匹配组件之前会先执行中间件处理
  middleware: 'authenticated',
  name: 'EditorIndex',
  data () {
    return {
      article: {
        body: "",
        description: "",
        tagList: '',
        title: "",
      },
      slug: '',
    }
  },
  async mounted () {
    this.slug = this.$route.params.slug
    if (this.slug) {
      const { data } = await getArticle(this.slug)
      this.article = data.article
    }

  },
  methods: {
    async onSubmit () {
      console.log(this.article)
      const params = {
        article: {
          ...this.article,
          tagList: this.article.tagList.split('，')
        },

      }
      try {
        if (this.slug ) {
          await updateArticle(params)
        } else {
          await createArticle(params)
        }
        // 跳转首页
        this.$router.push('/')
      } catch (error) {
        console.log(error)
      }
    }
  }
};
</script>

<style></style>
