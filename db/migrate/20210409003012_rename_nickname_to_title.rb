class RenameNicknameToTitle < ActiveRecord::Migration[6.1]
  def change
    rename_column :visions, :nickname, :title
    rename_column :goals, :nickname, :title
  end
end
