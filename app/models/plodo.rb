class Plodo < ActiveRecord::Base
  validates :plodo_type, presence: true
  validates :time, presence: true
  validates :info, presence: true
  validates :rand, presence: true
  belongs_to :pet, :class_name => 'Pet', :foreign_key => 'pet_id'
end
