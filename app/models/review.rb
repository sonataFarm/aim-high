class Review < ApplicationRecord
  validates :body, presence: true
  belongs_to :goal
end