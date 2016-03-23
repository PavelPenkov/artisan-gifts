class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :image_file_name, null: false
      t.integer :image_file_size, null: false
      t.string :image_content_type, null: false
      t.timestamp :image_updated_at, null: false
      t.timestamps null: false
    end
  end
end
