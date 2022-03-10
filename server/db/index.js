//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Story = require('./models/Story')
const Mood = require('./models/Mood')
const PathOption = require('./models/PathOption')


//associations could go here!
Story.hasMany(PathOption);
PathOption.belongsTo(Story)
Story.belongsToMany(Story, {as: 'NextStory', through:'StoryPath'})
Story.hasMany(User)
User.belongsTo(Story)


module.exports = {
  db,
  models: {
    User,
    Story,
    Mood,
    PathOption,
  },
}
