class Update < ActiveRecord::Base
  validates :info, presence: true
  belongs_to :pet, :class_name => 'Pet', :foreign_key => 'pet_id'
end
