class SeedGuestDemo
  def self.perform
    user = User.find_by_username('aim_high_demo')
    user.destroy if user

    user = User.create(
      username: 'aim_high_demo',
      password: '12345678',
      email: 'demo@aimhigh.com'
    )

    v = Vision.create(
      user: user,
      title: "Be Healthy",
      motivation: "As I get older, it becomes more important to take care of my health. I want to age gracefully. I want to avoid costly diseases and painful discomfort.",
      impact: "Being a healthy person will make my day-to-day life better. Mentally, I will have more energy and focus, which will make it easier to achieve my other goals"
    )

    g = Goal.create(
      user: user,
      vision: v,
      deadline: Date.today + 60.days,
      title: "Lose 10 Pounds",
      motivation: "Summer is coming up, and I want to look great at the beach.",
      impact: "I'll feel confident taking my shirt off at the beach.",
      strategy: "I will eat at a daily caloric deficit of 400 calories. Every day, I will log my calories in the LoseIt app. On Mondays, Tuesdays, Thursdays and Fridays, I will go to the gym at noon.",
      obstacles: [
        Obstacle.new(
          description: "Hunger cravings",
          solution: "Visualize being at the beach with washboard abs!"
        ),
        Obstacle.new(
          description: "Eating socially",
          solution: "Let my friends know about my diet goals ahead of time. Plan what I'm going to order before I get to the restaurant."
        )
      ],
      evidence: "I will weigh in every day, and log my results. I'll accept as evidence the moving average of my weigh-ins.",
      satisfaction: "I will fit into my blue shirt. I will feel confident at the beach.",
      monitoring: "On Sundays at 11am, I will collate all my weigh-ins into a single spreadsheet and review the results."
    )
  end
end