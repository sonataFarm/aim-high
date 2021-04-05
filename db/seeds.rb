require 'faker'

USER_COUNT = 10
USER_COUNT.times do
  User.create(
    username: Faker::Name.unique.name,
    email: Faker::Internet.email,
    password: '123456'  
  )
end

VISION_COUNT = USER_COUNT * 8
VISION_COUNT.times do
  Vision.create(
    user: User.all.sample,
    nickname: Faker::Lorem.words(number: rand(2..5)).map(&:capitalize).join(' '),
    description: Faker::Lorem.paragraph_by_chars(number: rand(180...300)),
    motivation: Faker::Lorem.paragraph_by_chars(number: rand(180...300)),
    impact: Faker::Lorem.paragraph_by_chars(number: rand(180...300)),
  )
end

GOAL_COUNT = VISION_COUNT * 5
GOAL_COUNT.times do
  user = nil

  while true
    user = User.all.sample
    break unless user.visions.empty?
  end

  Goal.create(
    user_id: user.id,
    vision_id: rand(0...user.visions.count),
    nickname: Faker::Lorem.words(number: rand(2..5)).map(&:capitalize).join(' '),
    description: Faker::Lorem.paragraph_by_chars(number: rand(180...300)),
    motivation: Faker::Lorem.paragraph_by_chars(number: rand(180...300)),
    impact: Faker::Lorem.paragraph_by_chars(number: rand(180...300)),
    strategy: Faker::Lorem.paragraph_by_chars(number: rand(180...300)),
    deadline: Faker::Date.between(from: '2021-04-04', to: '2021-12-31'),
    evidence: Faker::Lorem.paragraph_by_chars(number: rand(180...300)),
    satisfaction: Faker::Lorem.paragraph_by_chars(number: rand(180...300))
  )
end