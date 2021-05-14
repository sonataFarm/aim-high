json.id goal.id
json.title goal.title
json.description goal.description
json.motivation goal.motivation
json.impact goal.impact
json.strategy goal.strategy
json.deadline goal.deadline
json.evidence goal.evidence
json.satisfaction goal.satisfaction
json.visionId goal.vision.id
json.nextReviewDate goal.next_review_date

json.obstacles goal.obstacles.map do |o|
  json.id o.id
  json.description o.description
  json.solution o.solution
  json.goalId o.goal.id
end

json.reviews goal.reviews.map do |g|
  json.id g.id
  json.created_at g.created_at
  json.body g.body
  json.goalId g.goal.id
end