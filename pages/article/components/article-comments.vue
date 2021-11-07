<template>
  <div>
    <form class="card comment-form" @submit.prevent="createComment">
      <div class="card-block">
        <textarea
          v-model="comment.body"
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
        ></textarea>
      </div>
      <div class="card-footer">
        <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>

    <div
      class="card"
      v-for="comment in comments"
      :key="comment.id"
    >
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username
            }
          }"
          class="comment-author"
        >
          <img
            :src="comment.author.image"
            class="comment-author-img"
          />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username
            }
          }"
          class="comment-author"
        >
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY') }}</span>

        <span @click="headleDelete(comment.id)" v-if="isSelfArticle" class="mod-options">
          <i class="ion-trash-a"></i>
        </span>
      </div>
    </div>

  </div>
</template>

<script>
import { getComments, createComment, deleteComment } from '@/api/article'
export default {
  name: "ArticleComments",
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
  data () {
    return {
      comment: {
        body: ''
      },
      comments: [] //文章列表
    }
  },
  async mounted () {
    const { data } = await getComments(this.article.slug)
    this.comments = data.comments
  },
  methods: {
    /** 提交评论  */
    async createComment () {
      const { data } = await createComment(this.article.slug, {comment: this.comment})
      this.comments.push(data.comment)
      this.comment.body = ''
    },
    /** 删除自己的评论 */
    async headleDelete (id) {
      await deleteComment(this.article.slug, id)
      const index = this.comments.findIndex( comment => comment.id === id )
      this.comments.splice(index)
    }
  }
};
</script>

<style></style>
