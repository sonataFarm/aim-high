class Goal < ApplicationRecord
  validates :user_id, :vision_id, presence: true
  validates :deadline, format: { 
    with: /\A\d\d\d\d-\d\d-\d\d\Z/, message:  "Date must be of the format YYYY-MM-DD" 
  }
  belongs_to :vision
  belongs_to :user
  has_many :obstacles
  accepts_nested_attributes_for :obstacles
end
