class Update < ActiveRecord::Base
  validates :date, presence: true
  validates :time, presence: true
  validates :info, presence: true
  belongs_to :pet, :class_name => 'Pet', :foreign_key => 'pet_id'
end
