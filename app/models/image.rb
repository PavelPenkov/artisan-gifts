class Image < ActiveRecord::Base
  has_attached_file :image, {
    styles: { medium: '1000x1000>' },
    url: ':s3_domain_url',
    path: '/:class/:attachment/:id_partition/:style/:filename',
    hash_secret: 'paperclip_secret'
  }

  validates_attachment_presence :image
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  delegate :url, to: :image
end
