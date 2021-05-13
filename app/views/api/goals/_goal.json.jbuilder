json.id goal.id
json.title goal.title
json.description goal.description
json.motivation goal.motivation
json.impact goal.impact
json.strategy goal.strategy
json.deadline goal.deadline
json.evidence goal.evidence
json.satisfaction goal.satisfaction

json.obstacles goal.obstacles.map do |o|
  json.id o.id
  json.description o.description
  json.solution o.solution
end