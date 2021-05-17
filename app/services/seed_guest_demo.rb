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
      description: "I want to care for my health.",
      motivation: "As I get older, it becomes more important to take care of my health. I want to age gracefully. I want to avoid costly diseases and painful discomfort.",
      impact: "Being a healthy person will make my day-to-day life better. Mentally, I will have more energy and focus, which will make it easier to achieve my other goals"
    )

          g = Goal.create(
            user: user,
            vision: v,
            deadline: Date.today + 60.days,
            title: "Lose 10 Pounds",
            description: 'I want to lose lose ten pounds.',
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

                r = Review.create(
                  goal: g,
                  created_at: DateTime.now - rand(8..30).days(),
                  body: "I lost almost 1 pound since last week. That's pretty good! I had a big cheat day with 2 dishes of Szechuan food that I think cut into this. This week, I'll try to do even better — have a more reasonable cheat meal, in excess of no more than 1000 calories of my budget."
                )

                r = Review.create(
                  goal: g,
                  created_at: DateTime.now - rand(8..30).days(),
                  body: "Haven't been losing weight, which I'm frustrated about. Stuck at around 195 pounds. But I've been trying in earnest - I've been trying to find the right balance of calories and sleep. It's been a struggle. This week I am making inroads on my sleep habits, which will hopefully help me to maintain a caloric deficit without becoming sleep deprived."
                )

                r = Review.create(
                  goal: g,
                  created_at: DateTime.now - rand(8..30).days(),
                  body: "Lost 1.7 pounds last week. Wow! I'm starting to feel skinny. Major victory. I'm able to wear pretty much all the shirts in my closet now. Another huge victory and sign of progress and satisfaction.\n\n190 lbs is RIGHT around the corner!"
                )

          g = Goal.create(
            user: user,
            vision: v,
            deadline: Date.today + rand(30..60).days,
            title: "Improve My Posture",
            description: 'Right now my posture is slouched forward from too much sitting. I want to straighten it out and make it more ergonomic.',
            motivation: "My slouched-over posture hurts my back. I want to free myself from this pain! Having better posture will also increase my confidence.",
            impact: "With better posture, I'd be more mobile, and able to sit for longer periods of time without discomfort.",
            strategy: "Daily (6x week, Saturdays off):\n\n- 2 upper body stretch sessions.\n\n- 2 lower body stretch sessions.\n\n- 1 lower back stretch session (research this)\n\nDo each 10-minute session after 2 hours' worth of sitting work.",
            obstacles: [
              Obstacle.new(
                description: "Becoming too overwhelmed or physically stressed by my stretching routine.",
                solution: "Increment weekly:\n\n- Do one more 10-minute session a week.\n\n- Start with two sessions (upper, lower) a day."
              )
            ],
            evidence: "- Am I doing my daily stretches?\n\n- Am I incrementing weekly?",
            satisfaction: "- Better posture. Straighter back and more height.",
            monitoring: "Every Sunday at 9am, I will review my adherence to my stretching routine for the week, and note any signs of progress."
          )

                r = Review.create(
                  goal: g,
                  created_at: DateTime.now - rand(8..30).days(),
                  body: "Faced a setback this week when my back went out. I think I need to modify cobra pose. Try that. Don't add on this week."
                )

                r = Review.create(
                  goal: g,
                  created_at: DateTime.now - rand(8..30).days(),
                  body: "I was super consistent with two daily stretch blocks this week. I'm increasing it to three - add another upper-body stretch block.\n\nThis week I've been feeling taller, or more confident, or something. Maybe it's working!"
                )

                r = Review.create(
                  goal: g,
                  created_at: DateTime.now - rand(8..30).days(),
                  body: "On average I did one stretch session a day last week, so I'm increasing it to two this week."
                )

    v = Vision.create(
      user: user,
      title: "Career",
      description: "Have a lucrative career that's inspiring and engaging.",
      motivation: "I want a career that is inspiring and engaging. I am happiest when I have a creative project to sink my mind into. I have lots of creative energy and it needs a place to channel!",
      impact: "The more creatively engaging my career, the happier I will be. And having a good-paying job will positively impact my ability to stay financially independent and solvent."
    )

        g = Goal.create(
          user: user,
          vision: v,
          deadline: Date.today + rand(30..90).days,
          title: "Get Hired as a Software Engineer",
          description: 'I want to transition from support engineering to software engineering.',
          motivation: "Support engineering doesn't utilize my creative potential to the fullest. I want a job that fully utilizes and values my creativity, intellect and aesthetic sensibilities.",
          impact: "I will be happier with a job that utilizes my creativity. Attaining this goal would increase my confidence that I can do what I set my mind out to do.",
          strategy: "I've created an interview timeline calendar that encompasses learning and practicing algorithms and technical and behavioral interview skills. Study 5 - 6 days a week for at least 4 hours.",
          obstacles: [
            Obstacle.new(
              description: "Fear, anxiety and imposter syndrome.",
              solution: "Remind myself of the future I want, and the one I don't want."
            )
          ],
          evidence: "- Am I following the calendar? Are projects and studies progressing at the projected rate?",
          satisfaction: "- I am feeling more confident to go out and interview.\n\n- I am actually booking interviews.\n\n- I have a job offer as a software developer at a company.",
          monitoring: "Weekly, on Sundays. I will review the calendar and make sure my progress is keeping up with it, and that my plan makes sense."
        )

            r = Review.create(
              goal: g,
              created_at: DateTime.now - rand(8..30).days(),
              body: "It's nose to the grindstone time! Job search begins in a month. This week, we are required to finish up Aim High. Finished Princeton's Algorithms course as far as it takes me through the essentials of what I need to learn. GREAT JOB!."
            )

            r = Review.create(
              goal: g,
              created_at: DateTime.now - rand(8..30).days(),
              body: "Started practicing Cracking the Coding Interview. They give a great methodology for how to approach problem-solving. It will be important to practice this starting now."
            )

            r = Review.create(
              goal: g,
              created_at: DateTime.now - rand(8..30).days(),
              body: "This week we need to: - Get through most of Stephen Grider's course - Get through 2 weeks of Princeton Algorithms - Read CTCI chapters VI, VII"
            )
  end
end