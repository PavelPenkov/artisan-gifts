class Image < ActiveRecord::Base
  has_attached_file :image, styles: { medium: '1000x1000>' }
  validates_attachment_presence :image
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
end
