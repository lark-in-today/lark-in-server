const mongoArticle = require('./mongo').Article;
const art = new mongoArticle();

class Article {
  static async draft(ctx, next) {
    let body = ctx.request.body;
    let r = await art.draft.create({
      title: body.title,
      content: body.content,
      author: body.author
    });

    if (r._id) {
      ctx.body = { errMsg: 'ok' };
    } else {
      ctx.body = { errMsg: 'err' };
    }
  }

  static async get_draft(ctx, next) {
    let query = ctx.request.query;
    let r = await art.draft.find({
       _id: query.id
    });
    
    ctx.body = { errMsg: 'ok', data: r };
  }

  static async get_draft_thums(ctx, next) {
    let body = ctx.request.body;
    let r = await art.draft.find({
      author: body.author
    }, {
      title: 1,
    });

    ctx.body = { errMsg: 'ok', data: r };
  }

  static async update_draft(ctx, next) {
    let body = ctx.request.body;
    let r = await art.draft.updateOne({
      _id: body.id
    }, {
      $set: {
	title: body.title,
	content: body.content
      }
    });

    if (r._id) {
      ctx.body = { errMsg: 'ok' };
    } else {
      ctx.body = { errMsg: 'err' };
    }
  }

  static async delete_draft(ctx, next) {
    let query = ctx.request.query;
    let r = await art.draft.deleteOne({
      _id: query.id
    });

    if (r.deletedCount === 1) {
      ctx.body = { errMsg: 'ok' };
    } else {
      ctx.body = { errMsg: 'err' };
    }
  }
  
  static async article(ctx, next) {
    let body = ctx.request.body;
    let r = await art.article.create({
      title: body.title,
      content: body.content,
      author: body.author
    });

    if (r._id) {
      ctx.body = { errMsg: 'ok' };
    } else {
      ctx.body = { errMsg: 'err' };
    }
  }

  static async get_article(ctx, next) {
    let body = ctx.request.body;
    let r = await art.article.find({
      author: body.author
    });

    ctx.body = { errMsg: 'ok', data: r };
  }

  static async update_article(ctx, next) {
    let body = ctx.request.body;
    let r = await art.article.updateOne({
      _id: body.id
    }, {
      $set: {
	title: body.title,
	content: body.content
      }
    });

    if (r._id) {
      ctx.body = { errMsg: 'ok' };
    } else {
      ctx.body = { errMsg: 'err' };
    }
  }

  static async delete_article(ctx, next) {
    let query = ctx.request.query;
    let r = await art.article.deleteOne({
      _id: query.id
    });

    if (r.deletedCount === 1) {
      ctx.body = { errMsg: 'ok' };
    } else {
      ctx.body = { errMsg: 'err' };
    }
  }
  
  static async get_article_thums(ctx, next) {
    let body = ctx.request.body;
    let r = await art.article.find({
      author: body.author
    }, {
      title: 1,
    });
    
    ctx.body = { errMsg: 'ok', data: r };
  }
}

module.exports = Article;
