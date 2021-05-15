class Vision < ApplicationRecord
  validates :title, :user_id, presence: true

  belongs_to :user
  has_many :goals, dependent: :destroy
end