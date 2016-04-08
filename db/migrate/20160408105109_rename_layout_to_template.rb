class RenameLayoutToTemplate < ActiveRecord::Migration
  def change
    rename_table :layouts, :templates
  end
end
