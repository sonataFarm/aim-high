class RemoveNameFromVisions < ActiveRecord::Migration[6.1]
  def change
    remove_column :visions, :name, :string
  end
end
