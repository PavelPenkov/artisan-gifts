class Template < ActiveRecord::Base
  validates :data, presence: :true
  serialize :data, Hash

  def display_name
    name || "Шаблон #{id}"
  end
end
