class CreateVisions < ActiveRecord::Migration[6.1]
  def change
    create_table :visions do |t|
      t.string :name
      t.string :nickname
      t.text :description
      t.text :motivation
      t.text :impact
      t.timestamps
      t.references :user, index: true, foreign_key: true
    end
  end
end