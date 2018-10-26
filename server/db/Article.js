const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate');
const _ = require('lodash')
const {OTHERS} = require('./constants')
const Schema = mongoose.Schema


const STATUSES = {
  draft: 0,
  published: 1,
  // deleted: -1,
}

const schemaOpt = {
  createAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
  },
  status: {
    type: Number, // '0: 草稿箱， 1: 已发布， -1 已删除
    default: STATUSES.draft,
  },
  title: {
    type: String,
    // unique: true,
    // index: true,
  },
  content: {
    type: String,
  },
  rawContent: {
    type: String,
  },
  parentId: {
    type: String,
  },
  category: {
    type: String,
    default: OTHERS,
  }
}
const articleSchema = new Schema(schemaOpt)

const canUpdateKeys = _.without(Object.keys(schemaOpt), 'createAt')

// articleSchema.pre('save', function(next) {
//   if(this.title) {
//     next()
//   } else {
//     next(new Error('title 不能为空'))
//   } 
// })

articleSchema.plugin(mongoosePaginate);

const Article = mongoose.model('Article', articleSchema)


const methods = {};
methods.$create = ({status = STATUSES.published, title, content, rawContent, parentId, category = OTHERS}) => {
  const article = new Article({
    status,
    title,
    content,
    rawContent,
    parentId,
    category,
  });
  return article.save();
}

methods.$readById = id => {
  return new Promise((resolve, reject) => {
    Article.findById(id, (err, doc) => {
      if(err) {
        return reject(err);
      }
      resolve(doc)
    })
  });
}

methods.$query = query => {
  return new Promise((resolve, reject) => {
    Article.find(query, function(err, docs) {
      if(err) {
        return reject(err)
      }
      resolve(docs)
    })
  })
}

methods.$readList = ({page, limit, status = STATUSES.draft, keyword = '', category = ''}) => {
  return new Promise((resolve, reject) => {
    let query = {status}
    keyword !== '' && (query.title = new RegExp(keyword, 'i'))
    category !== '' && (query.category = category)
    category === OTHERS && (query.category = {
      $in: ['', OTHERS]
    })
    
    Article.paginate({
      ...query
    }, {
      page, 
      limit,
      sort: {createAt: -1}
    }, (err, result) => {
      if(err) {
        return reject(err);
      }
      resolve(result);
    })
  });
}

methods.$update = async ({id, ...rest}) => {
    let doc = await methods.$readById(id)
    if(!doc) {
      return {code: -1, msg: '不存在此记录'}
    }
    if(rest.status === STATUSES.published) {
      return publishingDoc(doc, rest)
    } else {
      return draftingDoc(doc, rest)
    }
}

async function publishingDoc (doc, update) {
  let parentId = doc.parentId
  let parentDoc = parentId ? await methods.$readById(parentId) : null
  let ret  
  if (parentId && parentDoc) { // 草稿文章拥有对应的线上文章，根据该草稿文章更新线上文章，删除草稿文章
    Object.assign(parentDoc, _.pick(doc, canUpdateKeys), update, {status: STATUSES.published, parentId: null})
    ret = await parentDoc.save()
    await methods.$delete(doc._id)
  } else {
    Object.assign(doc, update, {status: STATUSES.published})
    ret = await doc.save()
  }
  return ret
}

async function draftingDoc (doc, update) {
  let id = doc._id
  let docs = await methods.$query({parentId: id})
  let draftDoc = (docs && docs.length > 0 ) ? docs[0] : null
  let updated
  if(doc.status === STATUSES.published && !draftDoc) { // 该文章在线，现在要编辑并保存到草稿箱，则创建关联的下游草稿文章
      updated = await methods.$create({
          ..._.pick(doc, canUpdateKeys),
          ...update,
          status: STATUSES.draft,
          parentId: id,
        })
  } else {
      let targetDoc = draftDoc || doc
      Object.assign(targetDoc, update, {status: STATUSES.draft})
      updated = await targetDoc.save()
  }
  return updated
}

methods.$delete = (id) => {
  return new Promise((resolve, reject) => {
    Article.findByIdAndRemove(id, (err, doc) => {
      if(err) {
        return reject(err);
      }
      resolve(doc)
    })
  });
}

module.exports = methods;
