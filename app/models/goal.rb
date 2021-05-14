class Goal < ApplicationRecord
  validates :user_id, :vision_id, presence: true
  validates :deadline, format: { 
    with: /\A\d\d\d\d-\d\d-\d\d\Z/, message:  "Date must be of the format YYYY-MM-DD" 
  }
  
  belongs_to :vision
  belongs_to :user

  has_many :obstacles, dependent: :destroy
  has_many :reviews, dependent: :destroy

  accepts_nested_attributes_for :obstacles

  def next_review_date
    if reviews.any?
      reviews.last.created_at.to_date + 7.day
    else
      created_at.to_date
    end
  end
end
