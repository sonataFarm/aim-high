class Vision < ApplicationRecord
  validates :nickname, :user_id, presence: true

  belongs_to :user
  has_many :goals
end