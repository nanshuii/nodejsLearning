module.exports = {
    secret: 'ledonblogsessionsecret',
    key: 'ledonblogsessionkey',
    maxAge: 1000 * 60 * 60 * 24 * 30,
    url: 'mongodb://localhost:27017/ledonblog',
    db: 'ledonblog'
  };