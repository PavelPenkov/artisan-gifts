class Layout < ActiveRecord::Base
  validates :data, presence: :true
  serialize :data, Hash
end
