'use strict'

const {db, models: {User, Story, Mood, PathOption} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ])
  const moods = [{
    rating: 1 
},{
    rating: 2
},{
    rating: 3
},{
    rating: 4
},{
    rating: 5 
},{
    rating: 6
},{
    rating: 7
},{
    rating: 8
},{
    rating: 9
},{
    rating: 10
}]
const stories = [{
text: "You are asleep",
imageURL: "https://media.giphy.com/media/jwLAdEz6rw1u8/giphy.gif"
},
{text: "You are awake"},
{text: "You get up"},
{text: "You walk to the living room to make coffee. Maybe you kiss your plants, I dunno. It’s a weekday in the post-Covid era, so you have work in an hour or so, but the Soft kind of Work where you get to do it from home, so no one is really going to encounter your corporeal being."},
{text: "You watch a new episode of something in the 90-day-fiance universe and contemplate if you can afford to call in sick today. Mentally unwell counts as sick, right!??!"},
{text: "Oh no! You fell asleep in a weird position on a ¾ full beanbag for the whole day and now it’s Dark outside. You check your slack and you have several messages from your boss and your coworkers. You check your phone to find several more messages from your friends asking if you’re ok."},
{text: "You type out a smol response to your friends and your boss, apologizing for being MIA and telling them that you’ll be back attem tomorrow (you hope). This takes all of your energy, so back to bed, try again tomorrow."},
{text: "You send a feeble slack message to your boss, letting them know that you have a “huge migraine” and that you’re too sick to work. In reality, you have Mental Illness, and you are too Depressed to Work. Back to bed, try again tomorrow."},
{text: "Congratulations! You made it to your meeting! The bare minimum. Today you’re talking about thunks or arrays or linked lists or something. You’re not really sure anymore - the days all blend together."},
{text: "You make it through the meeting without having to interact with or be seen by anyone. You work on solo tasks for the rest of the day. By the time you’re done with work, it’s dark outside."},
{text: "You’re starting to (very slowly) get into the swing of the day. Maybe you have some Things to Add that are Valuable even. You even get really ambitious and schedule another meeting for later in the day, as it’s been on your to-do list and majorly stressing you out. Before you know it…"},
{text: "You enter the zoom waiting room and start to panic. There’s a reason you’ve been putting this off - you have to meet a new mentor. Its hard. It’s stressful. It’s a chance to be minimized or questioned. You take a deep breath and swallow down the lump in your throat. You’re charming, you’re great at advocating for yourself, and you can communicate your needs super clearly and logically. Its all going to be fine, right?"},
{text: "The meeting is over. You’ve emerged relatively unscathed - aside from needing a little time to calm down from the stress and anticipation. And hey, you even got those accommodations you needed. Maybe today isn’t so bad? Maybe you’ll even… Do Stuff Tonight After Work?"},
{text: "The meeting went So Well that youre feeling ENERGIZED. You’ve got to take advantage of this. After work, you text some friends about your great successes of the day and think about what to do with all this motivation."},
{text: "You end up making cinnamon rolls from scratch because those are the ingredients you have on hand. The apartment smells SO GOOD. Maybe even though today wasn't the Greatest, but tomorrow will be Better? Or at least Different?"},
{text: "You end up doing some drawing. You take some pictures of what you’ve doodled and send it to your friend. They REALLY LOVE the drawings, and that makes you feel good kind of. Today wasn’t so bad! Maybe tomorrow will be … Even Better? "},
{text: "You’ve gathered enough energy to make dinner and have a friend over to just chill one on one - something that generally you really love doing."},
]
const options = [{
text: "KEEP SLEEPING",
},
{
text: "WAKE ME UP (WAKE ME UP INSIDE)",
},
{
text: "STAY IN BED",
},
{
text: "STAY IN BED BUT START CHECKING EMAILS/ THINKING ABOUT YOUR DAY",
},
{
text: "GET UP",
},
{
text: "WHY DID I GET UP? EVERYTHING IS AWFUL",
},
{
text: "WHY DID I GET UP? EVERYTHING IS AWFUL. GUESS I GOTTA GET GOING ON THIS HORRIBLE TERRIBLE VERY BAD NO GOOD DAY",
},
{
text: "OOO REALLY VIBIN THIS MORNING GONNA KISS MY PLANTS AND MAKE SOME COFFEE",
},
]
await Promise.all(moods.map(mood => Mood.create(mood)));
    await Promise.all(stories.map(story => Story.create(story)))
    await Promise.all(options.map(option => PathOption.create(option)));;

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
