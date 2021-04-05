class CreateGoals < ActiveRecord::Migration[6.1]
  def change
    create_table :goals do |t|
      t.string :nickname
      t.text :description
      t.text :motivation
      t.text :impact
      t.text :strategy
      t.date :deadline
      t.text :evidence
      t.text :satisfaction
      t.references :user, foreign_key: true, index: true, null: false
      t.references :vision, foreign_key: true, index: true, null: false
      t.timestamps
    end
  end
end