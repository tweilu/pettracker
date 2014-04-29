class Pet < ActiveRecord::Base
	belongs_to :owner, :class_name => 'User', :foreign_key => 'owner_id'
	belongs_to :sitter, :class_name => 'User', :foreign_key => 'sitter_id'

end