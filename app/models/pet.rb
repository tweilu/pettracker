class Pet < ActiveRecord::Base
	validates :name, presence: true
	validates :pet_type, presence: true
	belongs_to :owner, :class_name => 'User', :foreign_key => 'owner_id'
	belongs_to :sitter, :class_name => 'User', :foreign_key => 'sitter_id'

	attr_accessor :sitter_email

end