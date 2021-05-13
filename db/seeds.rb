require 'faker'

10.times do
  u = User.create(
    username: Faker::Internet.username,
    email: Faker::Internet.email,
    password: '123456'  
  )

  rand(3..8).times do
    v = Vision.create(
      user: u,
      title: Faker::Lorem.words(number: rand(2..5)).map(&:capitalize).join(' '),
      description: Faker::Lorem.paragraph_by_chars(number: rand(180...300)),
      motivation: Faker::Lorem.paragraph_by_chars(number: rand(180...300)),
      impact: Faker::Lorem.paragraph_by_chars(number: rand(180...300)),
    )

    rand(0..5).times do 
      g = Goal.create(
        user: u,
        vision: v,
        title: Faker::Lorem.words(number: rand(2..5)).map(&:capitalize).join(' '),
        description: Faker::Lorem.paragraph_by_chars(number: rand(180...300)),
        motivation: Faker::Lorem.paragraph_by_chars(number: rand(180...300)),
        impact: Faker::Lorem.paragraph_by_chars(number: rand(180...300)),
        strategy: Faker::Lorem.paragraph_by_chars(number: rand(180...300)),
        deadline: Faker::Date.between(from: '2021-04-04', to: '2021-12-31'),
        evidence: Faker::Lorem.paragraph_by_chars(number: rand(180...300)),
        satisfaction: Faker::Lorem.paragraph_by_chars(number: rand(180...300))
      )

      rand(0..5).times do
        Obstacle.create(
          goal: g,
          description: Faker::Lorem.paragraph_by_chars(number: rand(180...300)),
          solution: Faker::Lorem.paragraph_by_chars(number: rand(180...300))
        )
      end
    end
  end
end

User.first.update(username: 'sonataFarm')