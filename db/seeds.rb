require 'faker'

USER_COUNT = 10
USER_COUNT.times do 
  User.create(
    username: Faker::Name.unique.name,
    email: Faker::Internet.email,
    password: '123456'  
  )
end

80.times do 
  Vision.create(
    description: Faker::Lorem.paragraph_by_chars(number: rand(180...300)),
    nickname: Faker::Lorem.words(number: rand(2..6)).map(&:capitalize).join(' '),
    motivation: Faker::Lorem.paragraph_by_chars(number: rand(180...300)),
    impact: Faker::Lorem.paragraph_by_chars(number: rand(180...300)),
    user_id: rand(0...USER_COUNT)
  )
end