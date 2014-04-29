class User < ActiveRecord::Base
	before_save { self.email = email.downcase }
	before_create :create_remember_token
	validates :name, presence: true, length: { maximum: 50 }
	validates :email, presence: true, uniqueness: { case_sensitive: false }
	has_secure_password
	validates :password, length: { minimum: 6 }
  has_many :my_pets, :class_name => 'Pet', :foreign_key => 'owner_id'
  has_many :sitting_pets, :class_name => 'Pet', :foreign_key => 'sitter_id'


  def User.new_remember_token
    SecureRandom.urlsafe_base64
  end

  def User.digest(token)
    Digest::SHA1.hexdigest(token.to_s)
  end

	private

    def create_remember_token
      self.remember_token = User.digest(User.new_remember_token)
    end
end
