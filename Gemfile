ruby '2.3.0'

source 'https://rubygems.org'

gem 'rails', '4.2.6'
gem 'sdoc', '~> 0.4.0', group: :doc
gem 'rake-hooks', require: false
gem 'sass-rails', '~> 5.0'
gem 'coffee-rails'
gem 'paperclip'
gem 'jbuilder', '~> 2.4'
gem 'oj'
gem 'mini_magick'
gem 'pg'
gem 'aws-sdk', '< 2.0'

group :development, :test do
  gem 'rspec-rails', '~> 3.0'
end

group :production do
  gem 'rails_12factor'
  gem 'puma'
end

group :development do
  gem 'sqlite3'
  gem 'web-console', '~> 2.0'
  gem 'spring'
  gem 'quiet_assets'
  gem 'awesome_print'
  gem 'pry'
  gem 'pry-byebug'
end

group :assets do
  gem 'uglifier'
end
