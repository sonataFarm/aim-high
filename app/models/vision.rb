class Vision < ApplicationRecord
  validates :name, :nickname, :user_id, presence: true

  belongs_to :user
end