class Relationship < ActiveRecord::Base
	belongs_to :sitter, class_name: "User"
	belongs_to :client, class_name: "User"
	validates :client_id, presence: true
	validates :sitter_id, presence: true
end
